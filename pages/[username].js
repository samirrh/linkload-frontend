import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '../components/Modal';
import LinkCard from '../components/LinkCard';

const Post = () => {
  const router = useRouter();
  const { username } = router.query;
  const [res, setRes] = useState(Array);
  const [letter, setLetter] = useState('');
  const { isOpen } = useContext(ModalContext);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8080/api/link/user/${username}`)
        .then((response) => {
          console.log(response.data);
          setRes(response.data);
          setLetter(username.charAt(0));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [username]);

  return (
    <>
      <div className="pt-10">
        <div className="flex justify-center">
          <div className="rounded-full h-24 w-24 flex items-center justify-center bg-indigo-700 font-bold text-white text-5xl grid">
            {letter}
          </div>
        </div>
        <div className="flex justify-center mt-2 text-2xl">{username}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-10">
        <script>                </script>
        {res.map((link) => (
          <LinkCard
            key={link?.linkId}
            linkId={link?.linkId}
            views={link?.views}
            url={link?.url}
            linkName={link?.linkName}
            description={link?.description}
          />
        ))}
      </div>
      {isOpen && <Modal></Modal>}
    </>
  );
};

export default Post;
