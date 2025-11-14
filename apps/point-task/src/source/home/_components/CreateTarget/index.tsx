import { useState } from 'react'
import { useCreateTargetsHooks } from '../../_hooks/useCreateTargets'
import { useAppStore } from '../../_store'
import TargetList from '../TargetList'

interface SetTargetsProps {
  onBack: () => void
}

function SetTargets({ onBack }: SetTargetsProps) {
  const [showMyTargets, setShowMyTargets] = useState<boolean>(false)
  const [wordNumber, setWordNumber] = useState('')
  const [points, setPoints] = useState<string | number>('')
  const [goatNumber, setGoatNumber] = useState('')
  const { userInfo } = useAppStore()
  const { createTargets, loading } = useCreateTargetsHooks()

  const difficultyLevel = (points: number) => {
    if (!points) {
      return ''
    }
    if (points < 50) return '简单'
    if (points < 100) return '中等'
    if (points < 150) return '困难'
    return '极难'
  }

  const generateUserId = () => {
    const userId = userInfo?.user_id
    return String(userId)
  }

  const createNewTarget = async () => {
    if (!wordNumber.trim() || !points) {
      alert('请填写目标名称和所需积分')
      return
    }

    // 构建请求数据
    const targetData = [
      {
        name: wordNumber,
        description: goatNumber || '',
        need_point: Number(points),
        user_id: generateUserId(),
      },
    ]
    console.log('创建目标数据:', targetData)
    // 调用API创建目标
    await createTargets(targetData)

    alert('目标创建成功！')
    setShowMyTargets(true)
    setGoatNumber('')
    setWordNumber('')
    setPoints('')
  }

  //
  if (showMyTargets) {
    return <TargetList onBack={() => setShowMyTargets(false)} />
  }
  return (
    <div className='flex justify-center items-center mb-6'>
      <div className='w-[80vh] bg-gray-50 px-6 py-6 rounded-lg mb-6 drop-shadow-lg'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>创建目标</h2>
        </div>

        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              目标名称 <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={wordNumber}
              onChange={e => setWordNumber(e.target.value)}
              className='w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 '
              placeholder='请输入目标名称'
              rows={2}
              maxLength={100}
            />
            {
              <div className='text-gray-500 mt-1 text-xs text-right'>
                {<div>{wordNumber.length} /100</div>}
              </div>
            }
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              所需积分 <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              value={points}
              onChange={e =>
                setPoints(e.target.value === '' ? '' : Number(e.target.value))
              }
              className='w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='请输入所需积分'
            />
            {typeof points === 'number' && points > 0 && (
              <div
                className={
                  points < 50
                    ? 'text-green-500'
                    : points < 100
                      ? 'text-orange-500'
                      : points < 150
                        ? 'text-red-500'
                        : 'text-red-500'
                }
              >
                难度等级：{difficultyLevel(points)}
              </div>
            )}
          </div>

          <div>
            <div className='flex'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                目标描述
              </label>
              <div className='text-gray-500 mt-0.5 text-xs text-right pl-1'>
                (可选)
              </div>
            </div>
            <textarea
              className='w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={4}
              placeholder='详细描述你的目标...'
              maxLength={200}
              value={goatNumber}
              onChange={e => setGoatNumber(e.target.value)}
            />
            {
              <div className='text-gray-500 mt-1 text-xs text-right'>
                {<div>{goatNumber.length} /200</div>}
              </div>
            }
          </div>

          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={e => {
                e.preventDefault()
                createNewTarget()
              }}
              disabled={loading}
            >
              {loading ? '创建中...' : '创建目标'}
            </button>

            <button
              type='button'
              onClick={onBack}
              className='mt-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SetTargets
