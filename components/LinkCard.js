import link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';
const LinkCard = ({
  linkId,
  views,
  url,
  linkName,
  description,
  deleteLink,
  passUpLink,
  isLoggedIn,
}) => {
  const { isOpen, setIsOpen, setLinkName, setLinkDescription, setUrl } =
    useContext(ModalContext);

  const [hrefUrl, setHrefUrl] = useState('');
  const [displayUrl, setDisplayUrl] = useState('');

  useEffect(() => {
    const timeOut = (url) => {
      console.log(linkId);
      setTimeout(() => {
        window.location.href = url;
      }, 5000); // hard coded time but allow user to pick time
    };
    const validateUrl = () => {
      if (url.substring(0, 8) === 'https://') {
        setHrefUrl(url);
        setDisplayUrl(url.substring(8));
        if (linkId == 121) {
          // hard coded linkId match now but allow user to choose link to redirect
          timeOut(url);
        }
      } else {
        setHrefUrl('https://' + url);
        if (linkId == 121) {
          timeOut('https://' + url);
        }
        setDisplayUrl(url);
      }
      if (url.substring(8).length > 20) {
        setDisplayUrl('link');
      }
    };
    validateUrl();
  }, [url]);

  let gridNum = isLoggedIn ? 5 : 4;
  return (
    <div
      className={`bg-indigo-300 grid lg:grid-cols-${gridNum} rounded-lg p-3 mb-1 place-items-center`}
      key={linkId}
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
        <a href={hrefUrl} target="_blank" rel="noreferrer">
          {displayUrl}
        </a>
      </div>
      <button
        className="bg-purple-500 w-32 hover:bg-purple-400 text-white font-bold py-1 px-2 border-b-4 my-1 border-purple-700 hover:border-purple-500 rounded-full"
        onClick={() => {
          setLinkName(linkName);
          setLinkDescription(description);
          setUrl(hrefUrl);
          setIsOpen(true);
        }}
      >
        Description
      </button>
      {isLoggedIn && (
        <div className="flex gap-6 mt-2">
          <button
            className="rounded-full h-10 w-10 flex items-center justify-center bg-indigo-700 font-bold text-white"
            onClick={() => deleteLink(linkId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            className="rounded-full h-10 w-10 flex items-center justify-center bg-indigo-700 font-bold text-white"
            onClick={() => passUpLink(linkName, url, description, linkId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkCard;
