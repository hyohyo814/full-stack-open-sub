import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    //prevent user from entering a blank input
    if ( newName === '' ) {
      alert(`Please input a valid name!`)
      return
    }

    if (newNumber === '' ) {
      alert(`Please input a valid number`)
      return
    }

    const personObj ={
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    console.log(newName)

    //create copy of persons arr to display simulated updated date
    const copy = [...persons]
    const postPerson = copy.concat(personObj)

    //logs the two arrays to console to show developer the main array and the updated array
    console.log(postPerson)
    console.log(persons)

    //use the size function of Set to compare unique name entries and check for change in size
    //as indicator of a non unique entry
    const check = new Set()
    console.log(check)
    const nameExists = postPerson.some((persons) => check.size === check.add(persons.name).size)
    const numberExists = postPerson.some((persons) => check.size === check.add(persons.number).size)
    
    console.log(nameExists)

    //alert the user if duplicate entry is inputted and prevent the code from updating the
    //main object array
    if (nameExists === true) {
      alert(`${personObj.name} already exists!`)
      setNewName('')
      return
    }
    if (numberExists === true) {
      alert(`${personObj.number} is already saved!`)
      return
    }
    //if no issues are found proceed to updating the array
    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  console.log(persons)

  const handleNameChange = (event) => {
    console.log(`name: ${event.target.value}`)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(`number: ${event.target.value}`)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  )
}

export default App