const Total = ({ parts }) => {
    //create a new array isolating the exercise numbers
    const exNum = parts.map(num => num.exercises)
    const init = 0
    const total = exNum.reduce((s, p) => s + p, init)
    console.log(`total sum of exercises in course is ${total}`)
    return (
        <b>total of {total} exercises</b>
    )
}

export default Total