// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from "react";

// this name component encapsulates its state, hiding the implementation details
// away from user of this component
function Name() {
  const [name, setName] = React.useState("");
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </div>
  );
}

// we are passing the state managed by the parent into this component as props
// this makes the API of this component slightly more complicated
function FavoriteAnimal({ animal, onAnimalChange }) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  );
}

function Display({ animal }) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
}

function App() {
  // whenever you see states being managed in a component, always determine
  // what elements in this component are using this state
  // if you notice only one element in this component is using this state,
  // it is a sign for you to "colocate" or move the state management into the element
  // this would make the API of the component easier to use and it can encapsulate it own state by itself
  const [animal, setAnimal] = React.useState("");

  // if we are managing state in a parent component, we will need to pass the
  // state updater function into the element using the state (as seen with setAnimal)

  // FavoriteAnimal & Display are siblings component that require the shared state
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={(event) => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  );
}

export default App;
