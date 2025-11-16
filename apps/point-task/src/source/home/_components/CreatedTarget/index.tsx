import { LeftOutlined } from '@ant-design/icons'
import { postPostCreactedTargetsHooks } from '../../_hooks/postCreactTargets'
import { useAppStore } from '../../_store'
interface CreatedTargetProps {
  onBack: () => void
}

function CreatedTarget({ onBack }: CreatedTargetProps) {
  const { creactedTargets, setCreactedTargets } = useAppStore()
  postPostCreactedTargetsHooks()
  console.log('creactedTargets', creactedTargets)
  return (
    <>
      <div className='p-6 w-2/5 mx-auto rounded-lg shadow-lg mt-2'>
        <div className='flex  items-center mb-4'>
          {/* head */}
          <button className='mr-4' onClick={onBack}>
            <LeftOutlined />
          </button>
          <h2 className='text-xl font-bold'>创建新目标</h2>
        </div>

        {/* body */}
        <div>
          {/* 目标名称 */}
          <div>
            目标名称
            <div>1</div>
          </div>
          {/* 所需积分 */}

          {/* 目标描述 */}

          {/* button */}
        </div>
      </div>
    </>
  )
}
export default CreatedTarget
