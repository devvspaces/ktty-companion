import { motion } from 'framer-motion'

export default function GlitchText({ text, layer }: { text: string, layer: number }) {
  const glitchLevel = layer > 2 ? 'animate-glitch' : ''

  return (
    <motion.span
      className={`relative ${glitchLevel}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  )
}
