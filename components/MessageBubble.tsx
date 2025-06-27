export default function MessageBubble({
  wallet,
  message,
  flair,
}: {
  wallet: string
  message: string
  flair: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-sm text-pink-300">{flair}</div>
      <div className="bg-[#302844] px-4 py-2 rounded-xl shadow-inner shadow-black/30 text-sm">
        <div className="text-xs text-purple-400 mb-1">{wallet}</div>
        <div>{message}</div>
      </div>
    </div>
  )
}
