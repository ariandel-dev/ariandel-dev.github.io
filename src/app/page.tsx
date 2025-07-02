'use client'

import dynamic from 'next/dynamic'

const DynamicScene = dynamic(() => import('../components/scene/first-scene'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <DynamicScene />
    </div>
  )
}
