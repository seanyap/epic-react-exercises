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
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);

  // React.useEffect's callback is called whenever the pokemonName changes
  React.useEffect(() => {
    // when the component mounts, pokemonName is falsy (an empty string) so we dont want to make a request
    if (!pokemonName) return;
    // clear the pokemon state to render the loading screen when fetching a new pokemon
    // if not we will see the previous pokemon as our loading screen
    setPokemon(null);
    // using the fetchPokemon API to get pokemon data
    fetchPokemon(pokemonName).then(
      (pokemonData) => {
        if (error) setError(false);
        setPokemon(pokemonData);
      },
      (error) => setError(error)
    );
  }, [pokemonName]);

  // return respective UI based on
  // 1. has error
  // 2. no pokemonName: 'Submit a pokemon'
  // 3. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  // 4. pokemon: <PokemonDataView pokemon={pokemon} />
  if (error) {
    return (
      <div role="alert">
        There was an error:{" "}
        <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      </div>
    );
  } else if (!pokemonName) {
    return "Submit a pokemon";
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  } else {
    return <PokemonDataView pokemon={pokemon} />;
  }
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
