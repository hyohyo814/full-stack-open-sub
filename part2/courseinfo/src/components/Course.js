import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

/*
const Course = ({ course }) => (
    return (
      <div>
        <Header key={course.id} course={course} />
        <Content key={course.id} parts={course.parts} />
        <Total key={course.id} parts={course.parts} />
      </div>
    )
 )
 */

  const Course = ({ course }) => (
    course.map(course => (
        <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    ))
  )


export default Course