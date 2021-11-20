import axios from 'axios';

const index = () => {
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
      .delete('http://localhost:8080/api/link/69', config)
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
      .put('http://localhost:8080/api/link/27', bodyParameters, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
        onClick={() => createLink()}
      >
        NEW LINK
      </button>
      <button
        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
        onClick={() => deleteLink()}
      >
        DELETE LINK
      </button>
      <button
        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
        onClick={() => updateLink()}
      >
        UPDATE LINK
      </button>
    </div>
  );
};

export default index;
