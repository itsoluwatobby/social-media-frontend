import React from 'react';
import styled from 'styled-components';

const ChatOnline = () => {
  return (
    <Container>
      <div className="chatOnlineFriend">
         <div className="chatOnlineImgContainer">
            <img src="https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="chatOnline" className='chatOnlineImg'/>
            <div className="chatOnlineBadge"></div>
         </div>
         <span className="chatOnlineUsername">John Doe</span>
      </div>
    </Container>
  );
}

export default ChatOnline;

const Container = styled.div`


   .chatOnlineFriend{
      display: flex;
      align-items: center;
      font-weight: 500;
      cursor: pointer;

      .chatOnlineImgContainer{
         position: relative;
         margin-right: 10px;
         
         .chatOnlineImg{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid white;
         }
      }

      .chatOnlineBadge{
         position: absolute;
         width: 10px;
         height: 10px;
         background-color: limegreen;
         border-radius: 50%;
         top: 0;
         right: 2px;
      }

      .chatOnlineUsername{

      }
   }

`