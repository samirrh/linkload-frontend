import axios from 'axios';
import Modal from '../../components/Modal';
import LinkCard from '../../components/LinkCard';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ModalContext } from '../../context/ModalContext';

const index = () => {
  const router = useRouter();
  const [res, setRes] = useState(Array);
  const [letter, setLetter] = useState('');
  const { isOpen } = useContext(ModalContext);

  const createLink = () => {
    if (typeof window !== 'undefined') {
      var token = localStorage.getItem('authToken');
    }
    const config = {
      headers: { Authorization: `Bearer ${token.toString()}` },
    };

    const bodyParameters = {
      linkName: 'FROM FRONTEND',
      description: 'BODY PARAM',
      url: 'https://www.ETH.ca/',
      views: 2000,
      showViews: false,
    };

    axios
      .post('http://localhost:8080/api/link', bodyParameters, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLink = () => {
    if (typeof window !== 'undefined') {
      var token = localStorage.getItem('authToken');
    }
    const config = {
      headers: { Authorization: `Bearer ${token.toString()}` },
    };

    axios
      .delete('http://localhost:8080/api/link/27', config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateLink = () => {
    if (typeof window !== 'undefined') {
      var token = localStorage.getItem('authToken');
    }
    const config = {
      headers: { Authorization: `Bearer ${token.toString()}` },
    };

    const bodyParameters = {
      linkName: 'UPDATED FROM FRONTEND',
      description: 'UPDATED FROM BODY PARAM',
      url: 'https://www.ETH.ca/',
      views: 123,
      showViews: true,
    };
    axios
      .put('http://localhost:8080/api/link/28', bodyParameters, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username');
    }
    axios
      .get(`http://localhost:8080/api/link/user/${username}`)
      .then((response) => {
        console.log(response.data);
        setRes(response.data);
        setLetter(username.charAt(0));
      })
      .catch((error) => {
        console.log('WTF');
      });
  }, []);

  return (
    <div className="flex grid-cols-2">
      <div className="mx-4 mb-4">
        <div className="">
          <div className="flex justify-center mb-4 mt-8">
            <div className="rounded-full h-24 w-24 flex items-center justify-center bg-indigo-700 font-bold text-white text-5xl grid">
              {letter}
            </div>
          </div>
          <div className="grid grid-cols-1 px-4 ">
            <div className="bg-indigo-300 grid lg:grid-cols-3 gap-2 rounded-lg p-3 mb-1 place-items-center">
              <button
                className="py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
                onClick={() => createLink()}
              >
                NEW LINK
              </button>
              <button
                className="py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
                onClick={() => deleteLink()}
              >
                DELETE LINK
              </button>
              <button
                className="py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
                onClick={() => updateLink()}
              >
                UPDATE LINK
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 mb-4 mt-7">
        <div className="">
          <div className="grid grid-cols-1 gap-4 ">
            <div className="bg-purple-300 grid lg:grid-cols-4 rounded-lg p-3 mb-1 place-items-center h-24">
              <div className="m-1">asfgsf</div>
              <button
                className="bg-purple-500 w-32 hover:bg-purple-400 text-white font-bold py-1 px-2 border-b-4 border-purple-700 hover:border-purple-500 rounded-full m-1"
                onClick={() => {}}
              >
                Description
              </button>
            </div>
            {res.map((link) => (
              <LinkCard
                key={link?.linkId}
                linkId={link?.linkId}
                views={link?.views}
                url={link?.url}
                linkName={link?.linkName}
                description={link?.description}
                isLoggedIn={true}
                deleteLink={deleteLink}
                updateLink={updateLink}
              />
            ))}
          </div>

          {isOpen && <Modal></Modal>}
        </div>
      </div>
    </div>
  );
};

export default index;
