import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([{ name: "", number: "" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showName, setShowName] = useState("");
  const [filterName, setFilterName] = useState([{ name: "", number: "" }]);
  const [notify, setNotify] = useState({
    message: null,
    code: null,
  });

  const resetMsg = () => {
    setTimeout(() => {
      setNotify({
        message: null,
        code: null,
      });
    }, 3000);
  };

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initDb) => {
      console.log("promise fulfilled");
      setPersons(initDb);
      //console.log(initDb);
    });
  }, [notify]);

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
      console.log(`name input: ${newName}`);
      const holdIndex = persons.findIndex((i) => i.name === newName);
      const holdId = persons[holdIndex].id;
      //console.log(holdIndex);
      //console.log(holdId);

      //PUT request
      window.confirm(
        `${personObj.name} is already added to phonebook, replace the old number with a new one?`
      )
        ? personService
            .update(holdId, personObj)
            .then((updateNumber) => {
              setNotify({
                message: `Updated ${personObj.name}'s contact info`,
                code: "success",
              });
              resetMsg();
              setNewName("");
              setNewNumber("");
            })
            .catch((err) => {
              console.log(err.response.data.error);
            })
        : setNewName("");
      return;
    }

    if (numberExists === true) {
      window.open(`${personObj.number} is already saved as ${personObj.name}!`);
      return;
    }

    personService
      .create(personObj)
      .then((returnedPer) => {
        //console.log(returnedPer);
        console.log(`promise fulfilled`);
        setPersons(persons.concat(returnedPer));
        setNotify({
          message: `Added ${personObj.name}`,
          code: "success",
        });
        resetMsg()
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setNotify({
          message: err.response.data.error,
          code: "error",
        });
        resetMsg();
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
    //console.log(persons);
    const delPerson = persons.find((p) => p.id === id);
    //filter out object with id bound to delete button
    window.confirm(
      `Are you sure you want to delete ${delPerson.name} from your contacts?`
    )
      ? personService
          .remove(id)
          .then(delTarget => {
            setNotify({
              message: `Deleted ${delPerson.name}`,
              code: "success",
            });
            resetMsg();
            console.log("Deletion was successful");
          })
          .catch((err) => {
            setNotify({
              message: err.response.data.error,
              code: "error",
            });
            resetMsg();
          })
      : setNotify({
          message: `Deletion of ${delPerson.name} was canceled`,
          code: "error",
        });
    resetMsg();
    return;
  };

  const handleNumberChange = (event) => {
    console.log(`number: ${event.target.value}`);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notify.message} handle={notify.code} />
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
