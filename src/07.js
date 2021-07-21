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

  // if you look at the code below, you need to figure out the structure like
  // the divs, buttons, lists, and try to picture it in your head
  // wouldn't it be better if we had a component that wrap all the code below
  // so when we use it, we will see <ItemList></ItemList> and we can immediately
  // tell what the UI is and form a picture in my head faster
  // this is the benefit of declarative code like react as opposed to imperative
  return (
    <div className="keys">
      <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {items.map((item) => (
          // 🐨 add a key prop to the <li> below. Set it to item.id
          <li>
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
