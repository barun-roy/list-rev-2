import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addNewItems} />
      <PackingList
        items={items}
        onRemoveItems={removeItems}
        onUpdateItems={updateItems}
      />
      <Stats packingStats={packingStats} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    setDescription("");
    setQuantity(1);
    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need for your 😎 trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option> */}

        {Array.from({ length: 20 }, (_, i) => i + 1).map((opt) => {
          return (
            <option value={opt} key={opt}>
              {opt}
            </option>
          );
        })}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onRemoveItems, onUpdateItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              onRemoveItems={onRemoveItems}
              onUpdateItems={onUpdateItems}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onRemoveItems, onUpdateItems }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onUpdateItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ packingStats }) {
  const { totalItems, packedItems, packedPercentage } = packingStats();
  if (totalItems === 0)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🛸</em>
      </p>
    );
  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? `You got everything! Ready to go 🚅🛫🛸🛳️🛣️🏞️`
          : `💼 You have ${totalItems} items on your list, and you have already packed
        ${packedItems} items (${totalItems !== 0 ? packedPercentage : 0}%)`}
      </em>
    </footer>
  );
}
