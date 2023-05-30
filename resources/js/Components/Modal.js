import React, {useState} from "react";

const Modal = ({children, modalOpen, setModalOpen, Footer}) => {
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className={`${
                modalOpen ? "fixed" : "hidden"
            } fixed inset-0 bg-black opacity-75`} />
            <div
                className={`${
                    modalOpen ? "fixed" : "hidden"
                } inset-0 flex items-center justify-center z-50`}
            >
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-4">{children}</div>
                </div>
            </div>
        </>

    );
};

export default Modal;
