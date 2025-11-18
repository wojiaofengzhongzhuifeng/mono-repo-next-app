import {
  CheckCircleOutlined,
  GiftOutlined,
  IssuesCloseOutlined,
  PlusOutlined,
} from '@ant-design/icons'

interface SelectModuleProps {
  onCreateTarget: () => void
  onCreateTask: () => void
}

function SelectModule({ onCreateTarget, onCreateTask }: SelectModuleProps) {
  return (
    <>
      <div>
        <div className='  p-6 w-2/5 mx-auto rounded-lg shadow-lg mt-2'>
          <div className='grid grid-cols-2 grid-rows-2 gap-4 h-64'>
            <div
              className='bg-blue-500 hover:bg-blue-600 rounded-lg flex flex-col items-center justify-center text-xl shadow-md text-white transition-colors duration-200 cursor-pointer'
              onClick={onCreateTarget}
            >
              <IssuesCloseOutlined className='text-2xl mb-2' />
              <div>创建目标</div>
            </div>
            <div
              className='bg-green-500 hover:bg-green-600 rounded-lg flex flex-col items-center justify-center text-xl shadow-md text-white transition-colors duration-200 cursor-pointer'
              onClick={onCreateTask}
            >
              <PlusOutlined className='text-2xl mb-2' />

              <div>添加任务</div>
            </div>
            <div className='bg-orange-500 hover:bg-orange-600 rounded-lg flex flex-col items-center justify-center text-xl shadow-md text-white transition-colors duration-200 cursor-pointer'>
              <CheckCircleOutlined className='text-2xl mb-2' />
              <div>完成任务</div>
            </div>
            <div className='bg-purple-500 hover:bg-purple-600 rounded-lg flex flex-col items-center justify-center text-xl shadow-md text-white transition-colors duration-200 cursor-pointer'>
              <GiftOutlined className='text-2xl mb-2' />
              <div>兑换目标</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SelectModule
