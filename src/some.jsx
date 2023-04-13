import React, { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { Course, Chapter, Component } from "./components/FirebaseContext";

export default function Some() {
  let x = false;
  function rc() {
    if (!x) {
      x = true;
    }
  }
  function click(index, value) {
    console.log(index, value);
    obj.delete(index, value);
    console.log(obj);
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
    <DeleteModal buttonText="delete" title="Are you sure?" onButtonClick={obj.delete.bind(obj)} index={1}/>
    {/* <CustomPopup buttonText="delete" title="what do u do" onButtonClick={click}/> */}
  </div>
  )
}
// let set = new Set();
// set.add("hello");
// set.add("world");
// set.add("you're");
// set.add("watching");
// set.add("bbc");
// console.log(set);
// set.delete("bbc")
// console.log(set.size); 
// console.log(set.values());
// console.log(set.keys());
// console.log(set.has("hello"));
// console.log(set.entries());
// set.forEach( val => {
//   console.log(val);
// })