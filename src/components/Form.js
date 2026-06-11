import { useState } from "react";

export default function Form({ onAddItems }) {
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
