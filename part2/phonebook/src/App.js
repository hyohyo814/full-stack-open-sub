import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "", number: "" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showName, setShowName] = useState("");
  const [filterName, setFilterName] = useState([{ name: "", number: "" }]);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initDb) => {
      console.log("promise fulfilled");
      setPersons(initDb);
      console.log(initDb);
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
    const postPerson = [...persons].concat(personObj);
    const check = new Set();
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

    personService.create(personObj).then((returnedPer) => {
      console.log(returnedPer);
      console.log(`promise fulfilled`)
      setPersons(persons.concat(returnedPer));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    console.log(`name: ${event.target.value}`);
    setNewName(event.target.value);
  };

  const handleNameFilter = (event) => {
    const filterInput = event.target.value;
    console.log(`filtering name: ${filterInput}`);
    setShowName(filterInput);
    console.log(showName);
    setFilterName(
      persons.filter(
        (persons) =>
          persons.name.toLowerCase().indexOf(filterInput.toLowerCase()) >= 0
      )
    );
  };

  const handlePersonId = (id) => {
    console.log(`Selected id: ${id}`);
    console.log(persons);
    const delPerson = persons.find((p) => p.id === id);
    const changedPerson = persons.filter((p) => p.id !== id);
    console.log(changedPerson);
    //filter out object with id bound to delete button
    console.log(delPerson);
    const confirm = window.confirm(
      `Are you sure you want to delete ${delPerson.name} from your contacts?`
    );

    if (confirm === false) {
      console.log(`deletion of ${delPerson.name} was canceled`);
      return;
    }
    personService.remove(id).then(() => {
      console.log("Deletion was successful");
      setPersons(changedPerson);
    });
  };

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
        filter={filterName}
        init={persons}
        input={showName}
        del={handlePersonId}
      />
    </div>
  );
};

export default App;
