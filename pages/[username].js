import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Post = () => {
  const router = useRouter();
  const { username } = router.query;
  const [res, setRes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/link/user/${username}`)
      .then((response) => {
        //console.log(response.data);
        setRes(response.data);
      })
      .catch((error) => {
        console.log('WTF');
      });
  }, [username]);

  return (
    <div>
      {res.map((link) => (
        <div key={link.linkId}>{link.url}</div>
      ))}
    </div>
  );
};

export default Post;
