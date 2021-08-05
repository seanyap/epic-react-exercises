// useState: greeting

import * as React from "react";

// Hooks = functions that let you "hook" into React state and lifecycle features
//         from function components
// State = data that change over time

function Greeting({ initialName }) {
  // use a hook to hook into(add) react state into the instance of your function component
  // useState hook returns an array which contains an updater function to update the state
  // calling the updater function will trigger a re-render
  // useState will return the new state value you called setState with
  const [name, setName] = React.useState(initialName);

  function handleChange(event) {
    // update the state "name" based on event.target.value (user input)
    setName(event.target.value);
  }

  // when setState is called, Greeting function component is called again to re-render(return) an updated UI
  // if we don't use setState, then Greeting func will not be called again, only once when it initialy renders
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
