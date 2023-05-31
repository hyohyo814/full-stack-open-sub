import { useState, useEffect } from "react";
import countryService from "../services/countries.js";
import weatherService from "../services/weather.js";
import "../index.css";

const RenderObj = ({ target, data }) => {
  const [countryObj, setCountryObj] = useState({});
  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
  });
  const [weatherState, setWeatherState] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    countryService
      ?.get(target)
      ?.then((country) => {
        console.log("promise fulfilled with countryService")
        setCountryObj(country);
      })
      .catch((error) => {
        window.alert("an error has occurred");
        return;
      });
    weatherService
      ?.getCoords(target)
      ?.then((location) => {
        console.log("promise fulfilled with weatherService")
        setLocation(location[0]?.local_names?.af);
        setGeo({ lat: location[0]?.lat, lon: location[0]?.lon });
      })
      .catch((error) => {
        window.alert("an error has occurred");
        return;
      });
    if (geo.lat !== "") {
      weatherService
        .getWeather(geo.lat, geo.lon)
        .then((weatherObj) => {
          console.log("promise fulfilled with weatherService")
          setWeatherState(weatherObj);
        })
        .catch((error) => {
          window.alert("an error has occurred");
          return;
        });
    }
    return;
  }, [target, geo.lat, geo.lon]);

  const listOut = (obj, arr) => {
    for (let content in obj) {
      //console.log(obj[content]);
      arr.push(obj[content]);
    }
  };

  if (weatherState === undefined) {
    return;
  }
  //console.log(countryObj);
  //console.log(countryObj?.name?.common);
  //console.log(countryObj?.languages);
  //console.log(geo);
  //console.log(weatherState);

  //Celsius temperature
  const temp = weatherState?.main?.temp - 273.15;

  //Get icon identifier
  const weatherIcon = weatherState?.weather?.[0]?.icon;
  //console.log(weatherIcon)

  //Get wind speed
  const windSpeed = weatherState?.wind?.speed;

  //conv language object into array of list items
  const langArr = [];
  listOut(countryObj?.languages, langArr);
  //console.log(langArr);
  const langList = langArr.map((lang) => <li key={Math.random().toFixed(3)}>{lang}</li>);
  //console.log(langList);

  //console.log(countryObj?.flags?.svg);
  const flag = countryObj?.flags?.svg;

  return (
    <>
      <h1>{countryObj?.name?.common}</h1>
      <p>capital: {countryObj?.capital}</p>
      <p>area: {countryObj?.area}</p>
      <h3>languages: </h3>
      <ul>{langList}</ul>
      <img src={flag} className="flagImg" alt="national flag" />
      <h2>Weather in {location}</h2>
      <p>temperature {temp.toFixed(2)} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt="forecast icon"
      />
      <p>wind {windSpeed} m/s</p>
    </>
  );
};

export default RenderObj;
