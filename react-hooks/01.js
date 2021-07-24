// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

function Greeting({ initialName }) {
  // use a hook to hook into(add) react state into the instance of your function component
  // useState hook gives you a function to update the state, which will trigger the re-render
  // in the re-render, useState hook will give you the state value for the current render(the value you called setState with)
  const [name, setName] = React.useState(initialName);

  // state = data that change over time

  function handleChange(event) {
    // update the state "name" based on event.target.value (user input)
    setName(event.target.value);
  }

  // Greeting function is called again to re-render(return) an updated UI when setState is called
  // if we don't use setState, then the Greeting func will not be called again, only once when it initialy renders
  // since func has its own local scope, and when it returns its local var will be gone
  // we need a way to re-run this func multiple times while keeping the "name" state
  // so we can display the state value on our UI
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        {/* the value prop for input makes it controlled input because regardless of what the user do, we are setting it to name */}
        {/* but since we're managing the name state and keeping it in sync, the user's experience is the same as before */}
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting initialName="Sean" />;
}

export default App;
