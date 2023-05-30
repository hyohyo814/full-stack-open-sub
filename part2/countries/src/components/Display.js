import RenderDisplay from "./RenderDisplay.js";

const Display = ({ target, inputQuery, info }) => {
  const filterList = target.map((c) => <p key={c.id}>{c}</p>);
  const nameList = info.map((c) => c.name).map((c) => c.common);

  if (filterList.length > 10 || inputQuery === "") {
    return <p>Too many matches, specify another filter</p>;
  }
  if (filterList.length > 1) {
    console.log(filterList.length);
    console.log(filterList);
    return filterList;
  }
  if (filterList.length === 1) {
    console.log("one match");
    //console.log(filterList);
    //console.log(target);
    //console.log(inputQuery);
    //console.log(nameList);
    const match = `${nameList.filter(
      (country) => country.toLowerCase().indexOf(inputQuery.toLowerCase()) >= 0
    )}`;
    console.log(match);
    return <RenderDisplay target={match} data={info} />;
  }
};

export default Display;
