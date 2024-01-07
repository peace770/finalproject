import React from "react";

export default function ContactUs() {
  let linkStyle = {
    margin: "1em",
  };

  return (
    <div style={{ padding: "2em", maxWidth: "25em" }}>
      <h1>צרו קשר</h1>
      <ul>
        <li>
          eeshwarts@gmail.com{" "}
          <a style={linkStyle} href="mailto:eeshwarts@gmail.com">
            📧
          </a>
        </li>
        <li>
          {" "}
          +972-587427707
          <a style={linkStyle} href="tel:+972587427707">
            📞
          </a>
          <a
            style={linkStyle}
            target="_blank"
            href="https://wa.me/+972587427707"
          >
            whatsapp
          </a>
        </li>
      </ul>
    </div>
  );
}
