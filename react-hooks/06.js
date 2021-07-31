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
  // Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null);
  // use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    // when the component mounts, pokemonName is falsy (an empty string) so we dont want to make a request
    if (!pokemonName) return;

    // clear the pokemon state to render the loading screen when fetching a new pokemon
    // if not we will see the previous pokemon as our loading screen
    setPokemon(null);
    // using the fetchPokemon API to get pokemon data
    fetchPokemon(pokemonName).then((pokemonData) => {
      setPokemon(pokemonData);
    });
  }, [pokemonName]);

  // return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  return !pokemonName ? (
    "Submit a pokemon"
  ) : !pokemon ? (
    <PokemonInfoFallback name={pokemonName} />
  ) : (
    <PokemonDataView pokemon={pokemon} />
  );
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
