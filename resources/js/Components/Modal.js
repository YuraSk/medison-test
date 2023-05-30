import React, {useState} from "react";

const Modal = ({children, modalOpen, setModalOpen, title}) => {
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

                <div className="bg-white rounded-lg shadow-lg ">
                    <div className="p-4 bg-gray-200 border-b border-gray-200 text-center ">
                        <h2 className="text-xl font-bold mb-4">{title}</h2>
                    </div>
                    <div className="mb-4 p-6">{children}</div>
                </div>
            </div>
        </>

    );
};

export default Modal;
