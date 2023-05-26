import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showName, setShowName] = useState('')
  const [filterName, setFilterName] = useState([
    { name: '', number: '', id:'' }
  ])

  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    //prevent user from entering a blank input
    if (newName === '') {
      alert(`Please input a valid name!`)
      return
    }

    if (newNumber === '') {
      alert(`Please input a valid number`)
      return
    }

    const personObj = {
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
    console.log(`precheck ${check}`)
    const nameExists = postPerson.some((persons) => check.size === check.add(persons.name).size)
    const numberExists = postPerson.some((persons) => check.size === check.add(persons.number).size)
    console.log(`postcheck ${check}`)

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

  const handleNameFilter = (event) => {
    console.log(`filtering name: ${event.target.value}`)
    setShowName(event.target.value)
    //console.log(showName)
    const currShowName = event.target.value
    const filterOut = persons.filter((persons) => persons.name.toLowerCase().indexOf(currShowName.toLowerCase()) >= 0)
    console.log(filterOut)
    setFilterName(filterOut)
  }

  console.log(filterName)

  const handleNumberChange = (event) => {
    console.log(`number: ${event.target.value}`)
    setNewNumber(event.target.value)
  }

  const DisplayFilt = ({ props }) => (
    props.map(persons => <p key={persons.id}>{persons.name} {persons.number}</p>)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          filter shown with: <input
            value={showName}
            onChange={handleNameFilter}
          />
        </div>
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
      <div>
        <DisplayFilt key={filterName.id} props={filterName} />
      </div>
    </div>
  )
}

export default App