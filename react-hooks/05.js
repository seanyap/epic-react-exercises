// useRef and useEffect: DOM interaction
// video #62

import * as React from "react";
// eslint-disable-next-line no-unused-vars
import VanillaTilt from "vanilla-tilt";
// we got the VanillaTilt API from the vanilla-tilt package

// everytime you need to interact with the dom, it is a side effect which can be
// achieve with the useRef and useEffect hooks
function Tilt({ children }) {
  const tiltRef = React.useRef();
  // useRef returns an object that has a current property, which is mutable
  // in our case, since we input nothing, we get undefined back
  // #2 use case of useRef is that we want to maintain a reference to someting,
  // and be able to make changes, but don't want to trigger re-render like useState

  // use VanillaTilt API to make your div look fancy inside of the side effect handler
  // this effect handler has an empty arraylist of dependencies. this means that
  // we dont have to synchronize the state of the world with the state of the app
  // because the state of the world(dom node) doesn't depend on the state of the app
  // this also means useEffect will only call the code only once
  React.useEffect(() => {
    const tiltNode = tiltRef.current;
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
    // returns a callback cleanup func to remove all event handlers that vanillaTilt
    // put on the dom node when the node is removed
    return () => tiltNode.vanillaTilt.destroy();
  }, []);
  // don't forget to specify your effect's dependencies array.
  // in our case we know that the tilt node will never change, so make it `[]`

  // add the `ref` prop to the `tilt-root` div
  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  );
}

export default App;
