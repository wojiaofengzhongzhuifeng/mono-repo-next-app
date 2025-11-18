import { useState } from 'react'
import CreatedTarget from './_components/CreatedTarget'
import CreatedTask from './_components/CreatedTask'
import SelectModule from './_components/SelectModule'
import GetUserInfo from './_components/UserInfo'

type ViewType = 'select' | 'createTarget' | 'createTask'

function Page() {
  const [currentView, setCurrentView] = useState<ViewType>('select')

  const handleCreateTarget = () => {
    setCurrentView('createTarget')
  }

  const handleCreateTask = () => {
    setCurrentView('createTask')
  }

  const handleBack = () => {
    setCurrentView('select')
  }

  return (
    <div>
      <div>
        <GetUserInfo></GetUserInfo>
        {currentView === 'createTarget' && (
          <CreatedTarget onBack={handleBack} />
        )}
        {currentView === 'createTask' && <CreatedTask onBack={handleBack} />}
        {currentView === 'select' && (
          <SelectModule
            onCreateTarget={handleCreateTarget}
            onCreateTask={handleCreateTask}
          />
        )}
      </div>
    </div>
  )
}

export default Page
