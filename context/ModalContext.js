import { createContext, useState } from 'react';

const ModalContext = createContext();
const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
export { ModalContext, ModalProvider };
