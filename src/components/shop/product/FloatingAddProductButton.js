import { useState } from "react";
import AddProductModal from "./AddProductModal";

const FloatingAddProductButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="p-0 fixed bottom-10 right-10 w-16 h-16 bg-blue-500 rounded-full hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <h1 className="material-icons text-white">add</h1>
      </button>
      {isOpen && <AddProductModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default FloatingAddProductButton;
