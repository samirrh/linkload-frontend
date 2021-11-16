import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import Modal from '../components/Modal';
import { ModalContext } from '../context/ModalContext';

const Post = () => {
  const router = useRouter();
  const { username } = router.query;
  const [res, setRes] = useState([]);
  const [letter, setLetter] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const { isOpen, setIsOpen } = useContext(ModalContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/link/user/${username}`)
      .then((response) => {
        //console.log(response.data);
        setRes(response.data);
        setLetter(username.charAt(0));
      })
      .catch((error) => {
        console.log('WTF');
      });
  }, [username]);

  return (
    <div>
      <div className="mt-10">
        <div className="flex justify-center">
          <div className="rounded-full h-24 w-24 flex items-center justify-center bg-red-300 font-bold text-white text-5xl grid">
            {letter}
          </div>
        </div>
        <div className="flex justify-center mt-2 text-2xl">{username}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-10">
        {res.map((link) => (
          <div
            className="bg-red-300 grid lg:grid-cols-4 rounded-lg p-3 mb-1 place-items-center"
            key={link.linkId}
          >
            <div className="m-1">{link.linkName}</div>
            <div className="m-1 grid grid-cols-2">
              {link?.views}
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
              <a href={link.url}>{link.url}</a>
            </div>
            <button
              className="bg-red-500 w-32 hover:bg-red-400 text-white font-bold py-1 px-2 border-b-4 border-red-700 hover:border-red-500 rounded-full m-1"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Description
            </button>
          </div>
        ))}
      </div>

      {isOpen && <Modal></Modal>}
    </div>
  );
};

export default Post;
