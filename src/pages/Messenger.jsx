import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import {AiOutlineSend} from 'react-icons/ai'
import ChatOnline from '../components/ChatOnline';
import useContextAuth from '../UserContext/useContextAuth'
import { conversationUrl, messageUrl } from '../api/axiosFetch';
import {io} from 'socket.io-client';

const Messenger = () => {
   const {loggedInUserId, users} = useContextAuth();
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const [conversations, setConversations] = useState([]);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');
   const [currentChat, setCurrentChat] = useState({});
   const scrollRef = useRef();
   const socket = useRef(io('ws://localhost:8990'))

   useEffect(() => {
     socket.current.emit('addUser', loggedInUserId)
     socket.current.on('getUsers', users => {
      console.log(users)
     })
   }, [loggedInUserId])


   useEffect(() => {
      const getConversations = async() => {
         setLoading(true)
         try{
            const response = await conversationUrl(`/${loggedInUserId}`)
            setConversations(response?.data)
         }
         catch(error){
            setLoading(false)
            !error.response && setError('no server response')
            error.response?.status === 400 && setError('no available conversations!')
            error.response?.status === 500 && setError('Please try again later');
         }
         finally{
            setLoading(false)
         }
      }
      getConversations()

   }, [loggedInUserId])

   useEffect(() => {
    
    const getMessage = async() => {
      try{
        const res = await messageUrl(`/${currentChat?._id}`)
        setMessages(res?.data)
      }
      catch(error){
        console.log(error)
      }
    }
    getMessage()

  }, [currentChat?._id])

  useEffect(() => {
      scrollRef.current?.scrollIntoView({behaviour: 'smooth'})
  }, [messages])

  const sendMessage = async(e) => {
      e.preventDefault()
      const message = {
         conversationId: currentChat._id,
         sender: loggedInUserId,
         text: newMessage
      }
      try{
         const res = await messageUrl.post('/', message)
         setMessages([...messages, res?.data])
         setNewMessage('');
      }
      catch(error){
         console.log(error)
      }
  }

  return (
    <Container>
      <div className="messenger">
         <div className="chatMenu">
            <div className="chatMenuWrapper">
               <input type="text" placeholder='search for friends' className="chatMenuInput" />
               {conversations.map(conversation => (
                     <div key={conversation?._id} onClick={() => setCurrentChat(conversation)}>
                        <Conversation  
                           conversation={conversation}
                           loggedInUser={users?.userData}   
                        />
                     </div>
                  ))
               }
            </div>
         </div>
         <div className="chatBox">
            <div className="chatBoxWrapper">
               {
                  currentChat ? (
                  <>
                     <div className="chatBoxTop">
                           {messages ? 
                              messages.map(message => (
                                 <div ref={scrollRef}>
                                    <Message key={message?._id} message={message} own={message?.sender === loggedInUserId ? true : ''}/>
                                 </div>
                              )): <p>{error}</p>
                           }
                     </div> 
                     <div className="chatBoxBottom">
                           <textarea 
                              name="" 
                              placeholder="type here..." 
                              className='chatMessageInput'
                              onChange={e => setNewMessage(e.target.value)}
                              rows="10"
                              value={newMessage}
                              >
                           </textarea> 
                           <AiOutlineSend className='chatSubmitButton' onClick={sendMessage}/>
                     </div>
                  </>   
                  ) : <p className='moreConversationText'>Open a conversation to start to a chat</p>
               }
            </div>
         </div>
         <div className="chatOnline">
            <div className="chatOnlineWrapper">
               <ChatOnline />
            </div>
         </div>
      </div>
    </Container>
  );
}

export default Messenger;

const Container = styled.div`
.chatMenuWrapper, 
.chatBoxWrapper, 
.chatOnlineWrapper{
   padding: 10px;
   height: 100%;         
}

   .messenger{
      height: calc(100vh - 70px);
      display: flex;

      .chatMenu{
         flex: 3.5;

         .chatMenuWrapper{

            .chatMenuInput{
               padding: 10px 2px;
               font-size: 17px;
               width: 90%;
               border: none;
               border-bottom: 1px solid gray;

               &:focus{
                  outline: none;
               }
            }
         }
      }

      .chatBox{
         flex: 5.5;

         .chatBoxWrapper{
            display: flex;
            flex-direction: column;
            position: relative;
            
            .chatBoxTop{
               height: 100%;
               overflow-y: scroll;
               padding-right: 10px;
            }

            .chatBoxBottom{
               margin-top: 5px;
               display: flex;
               align-items: center;
               justify-content: space-between;
               border-radius: 10px;

               .chatMessageInput{
                  width: 90%;
                  height: 60px;
                  padding: 10px
                  border: none;
                  box-sizing: border-box;
                  padding: 0 0 0 10px;
                  border-radius: 10px 0 0 10px;

                  &:focus{
                     outline: none;
                  }
               }

               .chatSubmitButton{
                  width:70px;
                  height: 60px;
                  border-radius: 0 10px 10px 0;
                  color: rgba(0,0,0,0.5);
                  cursor: pointer;
                  background-color: lightgray;
                  box-sizing: border-box;
                  transition: all 0.2s ease-in-out;

                  &:hover{
                     color: rgba(0,0,0,0.4);
                     background-color: rgba(0,0,0,0.2);
                  }

                  &:active{
                     color: rgba(0,0,0,0.5);
                     background-color: rgba(0,0,0,0.3);
                  }
               }
            }

            .moreConversationText{
               position: absolute;
               top: 10%;
               font-size: 50px;
               color: rgba(224, 220, 220);
               cursor: pointer;
            }
         }
      }

      .chatOnline{
         flex: 3;

         .chatOnlineWrapper{
            
         }
      }

      @media (max-width: 908px){
         
         .chatMenu{
            flex: 20%;

         }

         .chatBox{
            flex: 80%;
         }

         .chatOnline{
            position: fixed;
            right: 0;
            background-color: lightgray;
            height: calc(100vh - 50px);
            padding: 10px 5px;
            box-shadow: 2px 4px 16px rgba(0,0,0,0.3);
         }
      }
   }
`