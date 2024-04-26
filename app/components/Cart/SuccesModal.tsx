import React, { useState } from "react";
import Modal from "react-modal";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#app");

const SuccesModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  console.log({ isModalOpen });

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      <svg
        width="800"
        height="800"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g />
        <path
          d="M16 2.672C8.639 2.672 2.672 8.639 2.672 16S8.64 29.328 16 29.328c7.361 0 13.328-5.967 13.328-13.328S23.361 2.672 16 2.672m0 25.59C9.239 28.262 3.738 22.761 3.738 16S9.238 3.738 16 3.738c6.761 0 12.262 5.501 12.262 12.262S22.762 28.262 16 28.262"
          fill="#14AE5C"
        />
        <path
          d="m22.667 11.241-8.559 8.299-2.998-2.998a.8.8 0 0 0-1.131 1.131l3.555 3.555a.797.797 0 0 0 1.121.009l9.124-8.848a.8.8 0 0 0-1.113-1.149z"
          fill="#14AE5C"
        />
      </svg>
      <h2>Parabéns!</h2>
      <p>Seu pedido foi concluído com sucesso!</p>
      <button onClick={closeModal}><span>x</span></button>
    </Modal>
  );
};

export default SuccesModal;
