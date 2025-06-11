import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Divine Cat',
  description: 'A holy aura around the Divine Cat',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        {/*  
          This wrapper: 
           • Covers the full viewport (h-full) 
           • Applies your bg-heaven utility 
           • Centers its child (your page) both vertically & horizontally 
        */}
        <div
          className="
            h-full
            bg-heaven
            bg-cover
            bg-center
            bg-fixed
            flex
            items-center
            justify-center
            px-4
          "
        >
          {children}
        </div>
      </body>
    </html>
  )
}
