const Content = ... {
  return (
    <div>
      <Part ... />
      <Part ... />
      <Part ... />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
}
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a compromise',
    exercises: 14
  }
  
  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}

export default App