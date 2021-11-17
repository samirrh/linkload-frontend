import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
const LinkCard = ({ key, views, url, linkName, description }) => {
  const { isOpen, setIsOpen, setLinkName, setLinkDescription } =
    useContext(ModalContext);
  return (
    <div className="h-full">
      <div
        className="bg-indigo-300 grid lg:grid-cols-4 rounded-lg p-3 mb-1 place-items-center"
        key={key}
      >
        <div className="m-1">{linkName}</div>
        <div className="m-1 grid grid-cols-2">
          {views}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>

        <div className="m-1">
          <a href={url}>{url}</a>
        </div>
        <button
          className="bg-purple-500 w-32 hover:bg-purple-400 text-white font-bold py-1 px-2 border-b-4 border-purple-700 hover:border-purple-500 rounded-full m-1"
          onClick={() => {
            setLinkName(linkName);
            setLinkDescription(description);
            setIsOpen(true);
          }}
        >
          Description
        </button>
      </div>
    </div>
  );
};

export default LinkCard;
