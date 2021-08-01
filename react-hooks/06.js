// useEffect: HTTP requests

import * as React from "react";
// API from ../pokemon
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

function PokemonInfo({ pokemonName }) {
  // const [status, setStatus] = React.useState('idle')
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)

  // put all states into an object that has properties for each state
  const [state, setState] = React.useState({
    status: "idle",
    pokemon: null,
    error: null,
  });

  // destructure our state object so we can use the variable without having to
  // append state.status, state.pokemon etc
  const { status, pokemon, error } = state;

  // React.useEffect's callback is called whenever the pokemonName changes
  React.useEffect(() => {
    // when the component mounts, pokemonName is falsy (an empty string) so we dont want to make a request
    if (!pokemonName) return;
    // clear the pokemon state to render the loading screen when fetching a new pokemon
    // if not we will see the previous pokemon as our loading screen
    // setPokemon(null)

    // REMEMBER each setState TRIGGERS a re-render

    // keep in mind that this is setting the status object to only contain one
    // key-value pair: status: 'pending', we lost the pokemon and error pairs
    setState({ status: "pending" });

    // using the fetchPokemon API to get pokemon data
    fetchPokemon(pokemonName).then(
      (pokemonData) => {
        // {pokemon: pokemon} in es6 can be written {pokemon, ...}
        setState({ pokemon, status: "resolved" });
      },
      (error) => {
        setState({ error, status: "rejected" });
      }
    );
  }, [pokemonName]);

  // return/render different UI based on status
  // 1. has error
  // 2. no pokemonName: 'Submit a pokemon'
  // 3. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  // 4. pokemon: <PokemonDataView pokemon={pokemon} />
  if (status === "idle") {
    return "Submit a pokemon";
  } else if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === "resolved") {
    return <PokemonDataView pokemon={pokemon} />;
  } else if (status === "rejected") {
    return (
      <div role="alert">
        There was an error:{" "}
        <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      </div>
    );
  }
  // there can only be 4 options for our status
  throw new Error("This should not be possible");
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
