import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPosts } from '../../../api/axiosFetch';
import useContextAuth from '../../UserContext/useContextAuth';
import Posts from './Posts';
import Share from './Share';

const Feed = ({username}) => {
  const {loggedInUser, newPosts, setSearch, setReveal} = useContextAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchPosts = async() => {
      try{
        const {data} = username ? await getPosts(`/profile/${username}`) : await getPosts(`/timeline/${loggedInUser?._id}`)
      
        setPosts(data)
      }
      catch(error){
        setError(error)
      }
    }
    fetchPosts()

  }, [username, newPosts, loggedInUser?._id])

  const filteredPosts = posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <Container onClick={() => {
            setReveal(false)
            setSearch('')
            }}>
      <div className="feedWrapper">
        {(!username || username === loggedInUser?.username) && <Share />}
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

  .feedWrapper{
    padding: 20px;
  }
`