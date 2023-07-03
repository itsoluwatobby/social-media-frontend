import React from 'react';
import styled from 'styled-components';
import useContextAuth from '../UserContext/useContextAuth';
import {format} from 'timeago.js'

const Message = ({message, own}) => {
   const {loggedInUserId} = useContextAuth();
   
  return (
    <Container own={own}>
      <div className="messageTop">
         <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="pic" className='messageImg'/>
         <p className='messageText' own={own}>{message?.text} 
         </p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </Container>
  );
}

export default Message;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: ${props => props.own && 'flex-end'};
   margin-top: 20px;

   .messageTop{
      display: flex;

      .messageImg{
         width: 40px;
         height: 40px;
         border-radius: 50%;
         object-fit: cover;
         margin-right: 10px;
      }

      .messageText{
         padding: 10px;
         border-radius: 20px;
         background-color: #1877f2;
         color: #ffffff;
         white-space: wrap;
         max-width: 22rem;
         background-color: ${props => props.own && 'rgb(245,241,241)'};
         color: ${props => props.own && 'black'};
      }
   }

   .messageBottom{
      font-size: 12px;
      
   }
`