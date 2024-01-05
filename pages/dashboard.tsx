import dynamic from 'next/dynamic'
import React from 'react'

const ScriptDashboardComponent = dynamic(
  () => import('../views/ScriptDashboard'),
  { ssr: false },
)

export default function DashboardPage() {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <div>
          <ScriptDashboardComponent />
        </div>
      )}
    </>
  )
}
