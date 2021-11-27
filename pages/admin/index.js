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

  const deleteLink = (linkId) => {
    if (typeof window !== 'undefined') {
      var token = localStorage.getItem('authToken');
    }
    const config = {
      headers: { Authorization: `Bearer ${token.toString()}` },
    };

    axios
      .delete(`http://localhost:8080/api/link/${linkId}`, config)
      .then((res) => {
        console.log(res);
        if (typeof window !== 'undefined') {
          const username = localStorage.getItem('username');
          getAllLinks(username);
        }
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

  const getAllLinks = (username) => {
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
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username');
      getAllLinks(username);
    }
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
          <div className="grid grid-cols-1 px-4">
            <div className="bg-indigo-300 rounded-lg px-5 pb-5 pt-3 mb-1 place-items-center">
              <div className="flex justify-center items-center mb-3">
                <label className="block text-indigo-800 font-bold text-xl">
                  Add New Link
                </label>
              </div>
              <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-indigo-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Link Name
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      value=""
                      placeholder="linkName"
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-indigo-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      URL
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      placeholder="url"
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-indigo-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Description
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <textarea
                      className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      placeholder="Description"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-1 px-3 border-b-4 my-1 border-indigo-500 hover:border-indigo-200 rounded-full"
                    type="button"
                  >
                    Create
                  </button>
                </div>
              </form>
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
