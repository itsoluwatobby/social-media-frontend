import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchUsers } from '../../api/axiosFetch';
import {CgProfile} from 'react-icons/cg';

const Conversation = ({ conversation, loggedInUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation?.members.find(mem => mem !== loggedInUser?._id);
    
    const getUser = async() => {
      try{
        const targetUser = await fetchUsers(`/query?userId=${friendId}`)
        setUser(targetUser?.data)
      }
      catch(error){
        console.log(error)
      }
    }
    getUser()
  }, [conversation, loggedInUser])

  return (
    <Container>
      <div className="conversation">
        {user?.profilePicture ? (
            <img src={user?.profilePicture} alt="" className="conversationImg" />
          ) : (
            <CgProfile style={{fontSize:'40px', marginRight:'10px'}}/>
            )
        }
        <div className="conversationName">{user?.username}</div>
      </div>
    </Container>
  );
}

export default Conversation;

const Container = styled.div`

  .conversation{
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;

    .conversationImg{
      width: 45px;
      height: 45px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 20px;
    }

    conversationName{
      font-weight: 500;
    }

    &:hover{
      background-color: rgba(0,0,0,0.03);
    }
  }

  @media (max-width: 908px){

    .container{
      
    }
  }
`