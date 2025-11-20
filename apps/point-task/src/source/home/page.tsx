import CreatedTarget from '@/source/home/_components/CreatedTarget'
import CreatedTask from '@/source/home/_components/CreatedTask'
import GetUserTargetList from '@/source/home/_components/GetUserTargetList'
import GetUserTasksList from '@/source/home/_components/GetUserTasksList'
import SelectModule from '@/source/home/_components/SelectModule'
import GetUserInfo from '@/source/home/_components/UserInfo'
import { useState } from 'react'

type ViewType =
  | 'select'
  | 'createTarget'
  | 'createTask'
  | 'getTasksList'
  | 'getUserTargetList'

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

  const handleGetUserTargetList = () => {
    setCurrentView('getUserTargetList')
  }

  const advancedTargets = () => {
    setCurrentView('getUserTargetList')
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
            onGetUserTargetList={handleGetUserTargetList}
          />
        )}
        {currentView === 'getTasksList' && (
          <GetUserTasksList
            onBack={handleBack}
            onCreateTask={handleCreateTask}
          />
        )}
        {currentView === 'getUserTargetList' && (
          <GetUserTargetList onBack={handleBack} />
        )}
      </div>
    </div>
  )
}

export default Page
