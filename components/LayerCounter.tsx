export default function LayerCounter({ layer }: { layer: number }) {
  return (
    <div className="text-xs text-gray-400 mb-2 font-mono">
      Layer {layer}/5
    </div>
  )
}
