import React from "react";
import Image from "next/image";
import Close from "../../atoms/icons/cancel.svg";

interface Props {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ show, onClose, children }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow-lg relative w-5/6 sm:w-3/4">
        <div className="absolute top-2 right-2 text-gray-700" onClick={onClose}>
          <Image src={Close} alt="close" className="cursor-pointer"/>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
