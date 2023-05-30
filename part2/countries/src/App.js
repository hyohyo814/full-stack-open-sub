import { useState, useEffect } from "react";
import Display from "./components/Display.js";
import axios from "axios";
import countryService from "./services/countries.js";

const App = () => {
  const [country, setCountry] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [newInput, setNewInput] = useState("");
  const [filterCountry, setFilterCountry] = useState([""]);
  
  useEffect(() => {
    countryService.getAll().then(response => {
      //console.log(response);
      setCountry(response);
      setCountryNames(response.map(country => country.name.common))
    });
  }, []);

  const countryQuery = (event) => {
    const queryInput = event.target.value;
    setNewInput(queryInput);
    console.log(queryInput);
    setFilterCountry(
      countryNames.filter(
        (c) =>
          c.toLowerCase().indexOf(queryInput.toLowerCase()) >= 0
      )
    );
  };

  return (
    <div>
      find countries <input value={newInput} onChange={countryQuery} /> 
      <Display target={filterCountry} inputQuery={newInput} info={country}/>
    </div>
  );
};

export default App;
