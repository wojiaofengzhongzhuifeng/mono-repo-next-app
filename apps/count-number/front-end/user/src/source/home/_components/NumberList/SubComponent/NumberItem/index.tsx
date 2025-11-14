import { GetCountNumberResponse } from '@/source/home/_api/get-number'

export function NumberItem(props: GetCountNumberResponse) {
  console.log('props', props)
  return (
    <div className='border border-solid '>
      <div>id: {props.id}</div>
      <div>数字值: {props.numberValue}</div>
      <div>数字值的标题: {props.title}</div>
      <div>数字值的副标题: {props.subtitle}</div>
      <div>数字值的状态: {props.status}</div>
    </div>
  )
}
