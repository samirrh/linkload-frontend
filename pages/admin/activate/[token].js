import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const activate = () => {
  const router = useRouter();
  const { token } = router.query;
  const [accountActivated, setAccountActivated] = useState(false);
  const [message, setMessage] = useState('Activate Account!');
  useEffect(() => {
    if (token != undefined && token.length === 36) {
      axios
        .get(`http://localhost:8080/api/auth/activate/${token}`)
        .then((response) => {
          console.log('fa38ea62-e34f-40bc-8fa6-48a891acd6f3'.length);
          setAccountActivated(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMessage('Invalid Token');
    }
  }, [token]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-col">
        {accountActivated ? (
          <>
            <div className="flex justify-center m-2">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p>Account Activated!</p>
          </>
        ) : (
          <>
            <div className="flex justify-center m-2">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default activate;
