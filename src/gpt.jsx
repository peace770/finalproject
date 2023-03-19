import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  
};

Modal.setAppElement("#root");

export default function CustomPopup(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleButtonClick(value) {
    props.onButtonClick(value);
    closeModal();
  }

  return (
    <>
      <button onClick={openModal}>{props.buttonText}</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Custom Popup"
      >
        <h2>{props.title}</h2>
        <button onClick={() => handleButtonClick(true)}>
        yes, delete
        </button>
        <button onClick={() => handleButtonClick(false)}>
        no, unpublish insted
        </button>
      </Modal>
    </>
  );
}