import { createContext, useState } from 'react';

const ModalContext = createContext();
const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [linkName, setLinkName] = useState('');
  const [linkDescription, setLinkDescription] = useState('');
  const [url, setUrl] = useState('');
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        linkName,
        setLinkName,
        linkDescription,
        setLinkDescription,
        url,
        setUrl,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export { ModalContext, ModalProvider };
