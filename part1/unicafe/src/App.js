import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Feedback = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const StatisticsLine = (props) => (
  <tbody>
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.val}
      </td>
    </tr>
  </tbody>
)

const Statistics = ({ count }) => {
  if (count.total === 0) 
  return (
    <div>No feedback given</div>
  )
  return (<div>
    <StatisticsLine val={count.good} text='good' />
    <StatisticsLine val={count.neutral} text='neutral' />
    <StatisticsLine val={count.bad} text='bad' />
    <StatisticsLine val={count.total} text='total' />
    <StatisticsLine val={count.avg} text='average' />
    <StatisticsLine val={count.per + ' %'} text='percent' />
  </div>)
}

const App = () => {
  // save clicks of each button to its own state
  const [count, setCount] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    avg: 0,
    per: 0
  })

  const handleGood = () => {
    const currGood = count.good + 1;
    const currTotal = currGood + count.neutral + count.bad

    const currCount = {
      ...count,
      good: count.good + 1,
      total: currGood + count.neutral + count.bad,
      avg: (currGood - count.bad) / currTotal,
      per: 100 * currGood / currTotal,
    }
    setCount(currCount)
    console.log({ currCount })
  }

  const handleNeut = () => {
    const currNeut = count.neutral + 1;
    const currTotal = count.good + currNeut + count.bad

    const currCount = {
      ...count,
      neutral: count.neutral + 1,
      total: count.good + currNeut + count.bad,
      avg: (count.good - count.bad) / currTotal,
      per: 100 * count.good / currTotal,
    }
    setCount(currCount)
    console.log({ currCount })
  }

  const handleBad = () => {
    const currBad = count.bad + 1;
    const currTotal = count.good + count.neutral + currBad

    const currCount = {
      ...count,
      bad: count.bad + 1,
      total: count.good + count.neutral + currBad,
      avg: (count.good - currBad) / currTotal,
      per: 100 * count.good / currTotal,
    }
    setCount(currCount)
    console.log({ currCount })
  }

  return (
    <div>
      <Feedback />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeut} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics count={count} />
    </div>
  )
}

export default App