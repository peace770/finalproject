import React, { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { Course, Chapter, Component } from "./FirebaseConfig";
import CustomPopup from "./gpt";


export default function Some() {
  let x = false;
  function rc() {
    if (!x) {
      x = true;
    }
  }
  function click(value) {
    obj.delete();
  }
  const obj = new Chapter("chap", 1, rc.bind(x));

  obj.DBaddComponent(`abc`, `video`, `www.youtube.com`, "123");
  obj.DBaddComponent(`def`, `essay`, `https://mui.com/material-ui/react-css-baseline/`, `456`);
  obj.addComponent(`ghi`, `video`, `www.youtube.com`);
  obj.addComponent(`jkl`, `essay`, `https://drive.google.com/`);
  console.log(obj);

  obj.reorder(0, "down");
  // obj.deleteComponent(1);
  console.log(obj);
  // a.position  = 2;
  // let b = a.name;
  // console.log(a,b, x);
  return (
  <div>
    asdfdasfadgadgdhdahdgha
    <DeleteModal buttonText="delete" title="Are you sure?" onButtonClick={click}/>
    {/* <CustomPopup buttonText="delete" title="what do u do" onButtonClick={click}/> */}
  </div>
  )
}
