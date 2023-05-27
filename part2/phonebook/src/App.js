import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: '', number: '', id: ''}
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showName, setShowName] = useState("");
  const [filterName, setFilterName] = useState([]);
  const baseUrl = "http://localhost:3001/persons";
  

  useEffect(() => {
    console.log("effect");
    personService.getAll().then(initDb => {
      console.log("promise fulfilled");
      setPersons(initDb);
      console.log(initDb)
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    //prevent user from entering a blank input
    if (newName === "") {
      alert(`Please input a valid name!`);
      return;
    }

    if (newNumber === "") {
      alert(`Please input a valid number`);
      return;
    }

    const personObj = {
      name: newName,
      number: newNumber,
    };
    //console.log(newName);

    //POST request
    const postPerson = [...persons].concat(personObj)
    const check = new Set()
    const nameExists = postPerson.some(
      (persons) => check.size === check.add(persons.name).size
    );
    const numberExists = postPerson.some(
      (persons) => check.size === check.add(persons.number).size
    );
    if (nameExists === true) {
      alert(`${personObj.name} already exists!`);
      setNewName("");
      return;
    }
    if (numberExists === true) {
      alert(`${personObj.number} is already saved!`);
      return;
    }

    personService.create(personObj).then(returnedPer => {
      console.log(returnedPer)
      setPersons(persons.concat(returnedPer))
      setNewName('')
      setNewNumber('')
    })

    /*
    personsService.create(personObj).then(returnedPer=> {
      console.log(returnedPer);
      const postPerson = [...persons].concat(returnedPer);
      console.log(postPerson)
      const check = new Set();
      const nameExists = postPerson.some(
        (persons) => check.size === check.add(persons.name).size
      );
      const numberExists = postPerson.some(
        (persons) => check.size === check.add(persons.number).size
      );
      if (nameExists && numberExists === false) {
        setPersons(persons.concat(returnedPer));
      }
      if (nameExists === true) {
        alert(`${returnedPer.name} already exists!`);
        setNewName("");
        return;
      }
      if (numberExists === true) {
        alert(`${returnedPer.number} is already saved!`);
        return;
      }
      //if no issues are found proceed to updating the array
      
      setNewName("");
      setNewNumber("");
    })
*/

    /*
    //create copy of persons arr to display simulated updated date
    const copy = [...persons]
    const postPerson = copy.concat(personObj)

    //logs the two arrays to console to show developer the main array and the updated array
    console.log(postPerson)
    console.log(persons)

    //use the size function of Set to compare unique name entries and check for change in size
    //as indicator of a non unique entry
    const check = new Set()
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
    setNewNumber('')*/
  };

  //console.log(persons);

  const handleNameChange = (event) => {
    console.log(`name: ${event.target.value}`);
    setNewName(event.target.value);
  };

  const handleNameFilter = (event) => {
    console.log(`filtering name: ${event.target.value}`);
    setShowName(event.target.value);
    //console.log(showName)
    const currShowName = event.target.value;
    const filterOut = persons.filter(
      (persons) =>
        persons.name.toLowerCase().indexOf(currShowName.toLowerCase()) >= 0
    );
    console.log(filterOut);
    setFilterName(filterOut);
  };
/*
  personService.post(baseUrl, filterName).then(response => {
    console.log(response);
  })
  */

  console.log(filterName);

  const handleNumberChange = (event) => {
    console.log(`number: ${event.target.value}`);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterInput={showName} handleFilter={handleNameFilter} />
      <h3>add a new</h3>
      <PersonForm
        subForm={addContact}
        nameVal={newName}
        numVal={newNumber}
        handleName={handleNameChange}
        handleNum={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        key={filterName.id}
        filter={filterName}
        init={persons}
        input={showName}
      />
    </div>
  );
};

export default App
