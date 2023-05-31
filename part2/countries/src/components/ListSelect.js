import { useState } from "react";
import RenderDisplay from "./RenderObj.js";

const ListSelect = (list) => {
  //console.log(list);
  const [target, setTarget] = useState("");
  const expandList = list?.list;
  //console.log(expandList);

  const handleShowBtn = (handle) => {
    console.log("button clicked");
    const handleName = handle?.props?.children;
    setTarget(handleName);
  };

  const displayList = expandList.map((e) => (
    <p key={Math.random().toFixed(3)}>
      {e}
      <button onClick={() => handleShowBtn(e)}>show</button>
    </p>
  ));
  //console.log(target);
  //console.log(displayList);

  if (target !== "") {
    return <RenderDisplay target={target} />;
  }

  return displayList;
};

export default ListSelect;
