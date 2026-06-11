import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function addNewItems(item) {
    setItems((items) => [...items, item]);
  }

  function removeItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function updateItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  function packingStats() {
    const totalItems = items.length;
    const packedItems = items.filter((item) => item.packed === true).length;
    const packedPercentage = Math.floor((packedItems / totalItems) * 100);
    return { packedItems, totalItems, packedPercentage };
  }

  function clearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all the items in the list? 🤔",
    );
    confirmed && setItems((prev) => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addNewItems} />
      <PackingList
        items={items}
        onRemoveItems={removeItems}
        onUpdateItems={updateItems}
        onClearItems={clearList}
      />
      <Stats packingStats={packingStats} />
    </div>
  );
}
