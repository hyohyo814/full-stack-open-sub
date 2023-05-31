import RenderObj from "./RenderObj.js";
import ListSelect from "./ListSelect.js";

const Display = ({ target, inputQuery, info }) => {
  const filterList = target.map((c) => <p key={c.id}>{c}</p>);
  const nameList = info.map((c) => c.name).map((c) => c.common);
  const match = `${nameList.filter(
    (country) => country.toLowerCase().indexOf(inputQuery.toLowerCase()) >= 0
  )}`;

  if (filterList.length > 10 || inputQuery === "") {
    return <p>Too many matches, specify another filter</p>;
  }
  if (filterList.length > 1) {
    console.log(filterList.length);
    console.log(filterList);
    return <ListSelect list={filterList} />;
  }
  if (filterList.length === 1) {
    console.log("one match");
    //console.log(filterList);
    //console.log(target);
    //console.log(inputQuery);
    //console.log(nameList);

    console.log(match);
    return <RenderObj target={match} origin={filterList} />;
  }
};

export default Display;
