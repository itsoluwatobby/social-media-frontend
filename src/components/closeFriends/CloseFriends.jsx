import React from 'react';
import styled from 'styled-components';

const CloseFriends = ({user}) => {
  return (
    <Container>
      <img src={user.profilePicture} alt="display" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </Container>
  );
}

export default CloseFriends;

const Container = styled.li`
   display: flex;
   align-items: center;
   margin-bottom: 15px;

   .sidebarFriendImg{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
   }
`