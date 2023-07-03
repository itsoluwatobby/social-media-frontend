import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPosts } from '../../api/axiosFetch';
import useContextAuth from '../../UserContext/useContextAuth';
import Posts from './Posts';
import Share from './Share';

const Feed = ({username}) => {
  const {loggedInUserId, users, newPosts, setRightBar, setLeftBar, setSearch, setReveal} = useContextAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async() => {
      try{
        const {data} = username ? await getPosts(`/profile/${username}`) : await getPosts(`/timeline/${loggedInUserId}`)
      
        setPosts(data)
      }
      catch(error){
        setError(error)
      }
    }
    fetchPosts()

  }, [username, newPosts, loggedInUserId])

  const filteredPosts = posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <Container onClick={() => {
            setReveal(false)
            setSearch('')
            setRightBar(true)
            setLeftBar(false)
            }}>
      <div className="feedWrapper">
        {(!username || username === users?.userData?.username) && <Share />}
        {filteredPosts?.map(post => (
          <Posts key={post._id} post={post} error={error}/>
        ))}
      </div>
    </Container>
  );
}

export default Feed;

const Container = styled.div`
  flex: 5.5;
  position: relative;
  padding: 30px 20px 0 20px;

  .arrow-right{
    display: none;
  }

  @media (max-width: 908px){
    width: 100%;
    padding: 20px 0;
    overflow-x: none;

    .feedWrapper{
      padding: 20px;
    }

    &::-webkit-scrollbar{
        width: 1px;
    }

    &::-webkit-scrollbar-track{
        background-color: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb{
        background-color: rgb(179, 179, 179);
    }
  }
`