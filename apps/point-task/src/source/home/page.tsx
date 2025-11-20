import CreatedTarget from '@/source/home/_components/CreatedTarget'
import CreatedTask from '@/source/home/_components/CreatedTask'
import GetUserTasksList from '@/source/home/_components/GetUserTasksList'
import SelectModule from '@/source/home/_components/SelectModule'
import GetUserInfo from '@/source/home/_components/UserInfo'
import { useState } from 'react'
import AdvancedTarget from './_components/AdvancedTarget'

type ViewType =
  | 'select'
  | 'createTarget'
  | 'createTask'
  | 'getTasksList'
  | 'advanced'

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
  const advancedTargets = () => {
    setCurrentView('advanced')
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
            onAdvancedTargets={advancedTargets}
          />
        )}
        {currentView === 'getTasksList' && (
          <GetUserTasksList
            onBack={handleBack}
            onCreateTask={handleCreateTask}
          />
        )}
        {currentView === 'advanced' && <AdvancedTarget onBack={handleBack} />}
      </div>
    </div>
  )
}

export default Page
