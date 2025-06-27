const drinks = ['🍺', '🍸', '🥃', '🧃']

export default function DrinkMenu() {
  return (
    <div className="bg-[#1b1729] p-3 border-t border-purple-900 flex gap-3 justify-between">
      {drinks.map((d, i) => (
        <button
          key={i}
          className="bg-[#2e2648] text-lg p-2 rounded-lg hover:bg-pink-700 transition"
        >
          {d}
        </button>
      ))}
    </div>
  )
}
