import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Post = () => {
  const router = useRouter();
  const { username } = router.query;
  const [res, setRes] = useState([]);
  const [letter, setLetter] = useState('');

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
        <div className="flex justify-center">{username}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-10">
        {res.map((link) => (
          <div
            className="bg-red-300 grid lg:grid-cols-4 rounded-lg p-3 mb-1 place-items-center"
            key={link.linkId}
          >
            <div className="grid grid-cols-2">
              <div className="m-1">{link.linkName}</div>
              <div className="m-1">Views: {link?.views}</div>
            </div>
            <div className="m-1">
              <a href={link.url}>{link.url}</a>
            </div>
            <button className="bg-red-500 w-32 hover:bg-red-400 text-white font-bold py-1 px-2 border-b-4 border-red-700 hover:border-red-500 rounded-full m-1">
              Description
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
