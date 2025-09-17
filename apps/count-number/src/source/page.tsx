import NumberAction from './_components/number-action'

function Page ({ test }: { test: number }) {
  return (
      <div>
          <NumberAction data={test}/>
      </div>
  )
}
export default Page