// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

function Greeting({ initialName = "" }) {
  // initialize the state to the value from localStorage
  // problem is that retrieving the value from local storage is an expensive call
  // useState only uses the value at initialization and ignores it later bc
  // we're maintaining our own state inside of react, but the window.localStorage...
  // is still being evaluated
  // to mitigate this, we can wrap everything with inside of a function
  // react will only call this func once, aka lazy state initialization
  const [name, setName] = React.useState(
    () => window.localStorage.getItem("name") || initialName
  );

  console.log("rendering"); // to demonstrate how many time this component func is called (re-render)

  // useEffect hook accepts a callback and runs it every time after react renders
  // this custom code run is also known as "side-effect code"
  // however, react could re-render this component bc of other things like parent/sibling re-render
  // to prevent useEffect call after a non-related render, add a second argument to the useEffect call
  // which accepts an array of dependencies (aka dependencies list)
  // add all the dependencies variables to the array and when they change, useEffect will be called
  // now useEffect will be called only when the state of the world(local storage)
  // is not the same as the state of the app(react) and needs to be re-synced
  React.useEffect(() => {
    console.log("using effect"); // to demonstrate how many times useEffect is called
    window.localStorage.setItem("name", name);
  }, [name]);

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Greeting />
    </>
  );
}

export default App;
