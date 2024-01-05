import dynamic from 'next/dynamic'
import React from 'react'

const CanvasComponent = dynamic(() => import('@/views/CanvasPage'), {
  ssr: false,
})

export default function DashboardPage() {
  const [isClient, setIsClient] = React.useState(true)
  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <div>
          <CanvasComponent />
        </div>
      )}
    </>
  )
}