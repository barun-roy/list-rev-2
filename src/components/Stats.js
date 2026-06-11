export default function Stats({ packingStats }) {
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
