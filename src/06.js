// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";

function UsernameForm({ onSubmitUsername }) {
  // Make sure to accept the `event` as an argument and call
  function handleSubmit(event) {
    event.preventDefault(); // needed to prevent default behaviors of form submit (making a post request and as a result, making a full page request)
    console.log(event);
    onSubmitUsername(event.target.elements.usernameInput.value);
  }

  // 2 ways to get the value from the username input from the form element
  //   1. event.target.elements[0].value
  //   2. event.target.elements.<id or name>.value (better because we don't have to rely on the order of the inputs)

  // make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  // add the onSubmit handler to the <form> below
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  const onSubmitUsername = (username) => alert(`You entered: ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
}

export default App;
