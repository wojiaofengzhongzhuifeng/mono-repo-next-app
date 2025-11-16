import { useState } from 'react'
import CreatedTarget from './_components/CreatedTarget'
import SelectModule from './_components/SelectModule'
import GetUserInfo from './_components/UserInfo'

function Page() {
  const [showCreatedTarget, setShowCreatedTarget] = useState(false)

  const handleCreateTarget = () => {
    setShowCreatedTarget(true)
  }

  const handleBack = () => {
    setShowCreatedTarget(false)
  }

  return (
    <div>
      <div>
        <GetUserInfo></GetUserInfo>
        {showCreatedTarget ? (
          <CreatedTarget onBack={handleBack} />
        ) : (
          <SelectModule onCreateTarget={handleCreateTarget}></SelectModule>
        )}
      </div>
    </div>
  )
}

export default Page
