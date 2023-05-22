import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Disp = ({ anecdotes, vote }) => (
  <div>
    <p>{anecdotes}</p>
    <p>has {vote} votes</p>
  </div>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([
    0, 0, 0, 0, 0, 0, 0, 0
  ])

  const mostVotes = Math.max(...vote)
  const maxIndex = vote.indexOf(mostVotes)
  console.log(`quote no. ${maxIndex} has ${mostVotes} votes`)

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleRand = () => {
    const randSel = getRandomInt(0, anecdotes.length);
    setSelected(randSel)
    console.log(`current quote no. ${randSel}`)
  }

  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    console.log(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Disp anecdotes={anecdotes[selected]} vote={vote[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleRand} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Disp anecdotes={anecdotes[maxIndex]} vote={vote[maxIndex]} />
    </div>
  )
}

export default App