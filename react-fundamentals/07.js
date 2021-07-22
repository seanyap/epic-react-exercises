// Rendering Lists
// http://localhost:3000/isolated/exercise/07.js

import * as React from "react";

const allItems = [
  { id: "apple", value: "🍎 apple" },
  { id: "orange", value: "🍊 orange" },
  { id: "grape", value: "🍇 grape" },
  { id: "pear", value: "🍐 pear" },
];

function App() {
  const [items, setItems] = React.useState(allItems);

  function addItem() {
    const itemIds = items.map((i) => i.id);
    setItems([...items, allItems.find((i) => !itemIds.includes(i.id))]);
  }

  function removeItem(item) {
    setItems(items.filter((i) => i.id !== item.id));
  }

  // if you have a component that maintains state that changes over time,
  // you need to provide a "key prop" so react can keep track of the changes
  // and re-render it properly
  // in this case we need to provide a key prop to our individual <li></li>

  // if you look at the code below, you need to figure out the structure like
  // the divs, buttons, lists, and try to picture it in your head
  // wouldn't it be better if we had a component that wrap all the code below
  // so when we use it, we will see <ItemList></ItemList> and we can immediately
  // tell what the UI is and form a mental picture faster
  // this is the benefit of declarative code like react as opposed to imperative
  return (
    <div className="keys">
      <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {items.map((item) => (
          <li key={item.id}>
            <button onClick={() => removeItem(item)}>remove</button>{" "}
            <label htmlFor={`${item.id}-input`}>{item.value}</label>{" "}
            <input id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
