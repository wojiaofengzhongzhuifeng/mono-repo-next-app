import CreatedTarget from '@/source/home/_components/CreatedTarget'
import CreatedTask from '@/source/home/_components/CreatedTask'
import GetUserTasksList from '@/source/home/_components/GetUserTasksList'
import SelectModule from '@/source/home/_components/SelectModule'
import GetUserInfo from '@/source/home/_components/UserInfo'
import { useState } from 'react'

type ViewType = 'select' | 'createTarget' | 'createTask' | 'getTasksList'

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

  const handleGetTasksList = () => {
    setCurrentView('getTasksList')
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
            onGetTasksList={handleGetTasksList}
          />
        )}
        {currentView === 'getTasksList' && (
          <GetUserTasksList onBack={handleBack} onCreateTask={handleCreateTask} />
        )}
      </div>
    </div>
  )
}

export default Page
