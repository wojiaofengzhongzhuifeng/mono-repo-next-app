import React, { useState } from 'react'
import { FaPlus, FaBullseye, FaCheck, FaGift } from 'react-icons/fa'
import CreateTarget from '../CreateTarget'
import CreateTask from '../CreateTask'
import TaskList from '../TaskList'
import TargetList from '../TargetList'

function ActionMenu() {
  const [showSetTargets, setShowSetTargets] = useState(false)
  const [showAddTargets, setShowAddTargets] = useState(false)
  const [showMyTask, setShowMyTask] = useState(false)
  const [showTargetList, setShowTargetList] = useState(false)
  if (showSetTargets) {
    return <CreateTarget onBack={() => setShowSetTargets(false)} />
  }

  if (showAddTargets) {
    return <CreateTask onBack={() => setShowAddTargets(false)} />
  }

  if (showMyTask) {
    return <TaskList onBack={() => setShowMyTask(false)} />
  }
  if (showTargetList) {
    return <TargetList onBack={() => setShowTargetList(false)} />
  }
  return (
    <>
      <div className='flex justify-center items-center mb-6'>
        <div className='grid grid-cols-2 gap-3 h-[45vh] w-[70vh] bg-gray-50 text-white px-6 py-6 rounded-lg mb-6 drop-shadow-2xl'>
          <div
            className=' bg-blue-500/100 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-blue-600/100 transition-colors'
            onClick={() => setShowSetTargets(true)}
          >
            <FaBullseye className='text-white text-xl mb-2' />
            <div>创建目标</div>
          </div>
          ¡
          <div
            className='bg-green-500/100 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-green-600/100 transition-colors '
            onClick={() => setShowAddTargets(true)}
          >
            <FaPlus className='text-white text-xl' />
            <div>添加任务</div>
          </div>
          <div
            className='bg-orange-500/100 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-orange-600/100 transition-colors '
            onClick={() => setShowMyTask(true)}
          >
            <FaCheck className='text-white text-xl mb-2' />
            <div>完成任务</div>
          </div>
          <div
            className='bg-purple-500/100  flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-purple-600/100 transition-colors '
            onClick={() => setShowTargetList(true)}
          >
            <FaGift className='text-white text-xl mb-2' />
            <div>兑换奖励</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActionMenu
