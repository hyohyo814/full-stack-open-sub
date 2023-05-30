import { useState, useEffect } from "react";
import countryService from "../services/countries.js";
import '../index.css'

const RenderDisplay = ({ target, data }) => {
  const [countryObj, setCountryObj] = useState({});

  useEffect(() => {
    countryService.get(target).then((country) => {
      setCountryObj(country);
    });
  }, [target]);

  //console.log(countryObj);
  //console.log(countryObj?.name?.common);
  //console.log(countryObj?.languages);

  const langArr = []
  const listOut = (obj) => {
    for (let content in obj) {
      console.log(obj[content]);
      langArr.push(obj[content])
    }
  };
  console.log(listOut(countryObj?.languages));
  console.log(langArr)

  const langList = langArr.map(lang => <li key={lang.id}>{lang}</li>)
  console.log(langList)
  
  console.log(countryObj?.flags?.svg)
  const flag = countryObj?.flags?.svg
  return (
    <>
      <h1>{countryObj?.name?.common}</h1>
      <p>capital: {countryObj?.capital}</p>
      <p>area: {countryObj?.area}</p>
      <h3>languages: </h3>
      <ul>{langList}</ul>
      <img src={flag} className="flagImg" alt="national flag" />
    </>
  );
};

export default RenderDisplay;
