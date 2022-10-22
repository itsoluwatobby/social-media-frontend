import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useContextAuth from '../../UserContext/useContextAuth';
import {AiOutlineSend} from 'react-icons/ai'
import { getPosts } from '../../../api/axiosFetch';
import {format} from 'timeago.js';
import { sub } from 'date-fns';
import { FaTrash } from 'react-icons/fa';

const Comments = ({post}) => {
   const {loggedInUser, setGetComment} = useContextAuth()
   const [newComment, setNewComment] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [comments, setComments] = useState([]);
   const [reload, setReload] = useState(false);
   
  
   useEffect(() => {
      const getComments = async() => {
            setLoading(true)
         try{
            const response = await getPosts.get(`/comments/${post?._id}`)
            setComments(response.data)
            setGetComment(response.data)
         }
         catch(error){
            setLoading(false)
            !error.response && setError('no response')
            error.response?.status === 400 && setError('post not found!')
            error.response?.status === 500 && setError('Please try again later');
         }
         finally{
            setLoading(false)
         }
      }
      getComments()

   }, [post?._id, loggedInUser?._id, reload])


   const handleComment = async(id) => {
      setLoading(true)
      if(!newComment) return
      const dateTime = sub(new Date(), {minutes: 0}).toISOString();
      const newComments = { 
            postId: post._id, 
            email: loggedInUser.email.split('@')[0], 
            dateTime, 
            comment: newComment
         }

      try{
         const response = await getPosts.post(`/comments`, newComments);
         setComments([...comments, response.data])
         setNewComment('')
      }
      catch(error){
         setLoading(false)
         !error.response && setError('no response')
         error.response?.status === 400 && setError('user credentials required!')
         error.response?.status === 500 && setError('Please try again later');
      }
      finally{
         setLoading(false)
      }
   }

   const handleDelete = async(postId, commentId) => {
      
      try{
         await getPosts.delete(`/comments/${postId}/${commentId}`);
         setReload(prev => !prev)
      }
      catch(error){
         !error.response && setError('no response')
         error.response?.status === 400 && setError('user credentials required!')
         error.response?.status === 500 && setError('Please try again later');
      }
   }

   let message = (
      <p style={{fontStyle:'cursive', marginTop:'1rem', marginLeft:'0.5rem'}}>loading comments...</p>
   )

   let errMessage = (
      <p>{error}</p>
   )

   const canSubmit = Boolean(newComment)
   const filteredComments = comments.sort((a, b) => b?.createdAt.localeCompare(a?.createdAt))

   let content = (
         <div className='commentsContainer'>
            <div className="newComment">
               <input
                  type="text" 
                  className="commentInput"
                  required
                  placeholder='comment here'
                  value={newComment}
                  onKeyDown={(e) => e.key === 'Enter' && handleComment(post?._id)}
                  onChange={(e) => setNewComment(e.target.value)}
               />
               {canSubmit && <AiOutlineSend className='send' onClick={() => handleComment(post?._id)}/>}
            </div>
               <div className="comments">
               {loading && message}
               {/* {!loading && error && errMessage} */}
               {filteredComments?.length ? filteredComments.map(comment => (
                  comment?.postId === post?._id && (
                     <div key={comment._id} className='container'>
                        <p className='commentHeading'>
                           <span className='author'>{comment?.email}</span>
                           <span className='date'>{format(comment?.dateTime)}...</span>
                        </p>
                        <p className='body'>{comment?.comment}</p>
                        <FaTrash 
                           className='trash' 
                           title='delete' 
                           onClick={() => handleDelete(post?._id, comment?._id)}
                        />
                     </div>)
                     )
                  )  :  (
                        <p className='noComment'>No comments...</p>
                     )
                  }
               
               </div>
         </div>
   )

   return (
      <Container>
         {content}
      </Container>
   );
}

export default Comments;

const Container = styled.div`

   .commentsContainer{
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      background-color: rgba(0,0,0,0.1);
      padding: 4px;
      width: 100%;
      border-radius: 5px;

      .newComment{
         display: flex;
         align-items: center;
         width: 100%;
         border: none;
         border-radius: 10px;
         height: 30px;
         background-color: white;

         .commentInput{
            flex: 92%;
            width: 200px;
            height: 100%;
            box-sizing: border-box;
            border-radius: 10px;
            border: none;
            font-size: 16px;
            padding: 5px 5px 5px 10px;

            &:focus{
               outline: none;
            }
         }

         .send{
            flex: 8%;
            font-size: 24px;
            color: rgba(0,0,0,0.8);
            cursor: pointer;
            transition: opacity 0.25 ease-in;

            &:hover{
               opacity: 0.8;
            }

            &:active{
               opacity: 1;
            }
         }
      }

      .comments{
         margin: 0.6rem 0.2rem 0.2rem 0.2rem;

         .container{
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            position: relative;
            padding: 0.4rem 0.5rem 0.7rem 0.5rem;
            border-radius: 5px;
            justify-content: space-between;
            box-shadow: -2px 4px 10px rgba(0,0,0,0.1);


            .commentHeading{
               display: flex;
               align-items: center;

               .author{
                  flex: 3;
                  font-size: 15px;
                  color: rgba(0,0,0,0.7);
                  position: relative;

                  &:after{
                     content: "";
                     width: 5px;
                     height: 5px;
                     border-radius: 50%;
                     background-color: rgba(0,0,0,0.5);
                     position: absolute;
                     left: 40px;
                     top: 5px;
                  }
               }

               .date{
                  flex: 7;
                  color: gray;
                  font-size: 12px;
               }
            }

            .body{
               color: rgba(0,0,0,0.9);
               font-family: cursive;
               font-size: 15px;
               line-height: 5px;
               word-break: break-all;

               .first{
                  text-transform: capitalize;
               }
            }

            .trash{
               position: absolute;
               right: 5px;
               top: 50%;
               color: rgba(0,0,0,0.6);
               cursor: pointer;
               font-size: 17px;
               transition: color 0.24s ease-in-out;

               &:hover{
                  color: rgba(0,0,0,0.4);
               }

               &:active{
                  color: rgba(0,0,0,0.6);
               }
            }
         }

         .noComment{
            text-align: center;
            font-size: 17px;
            margin-top: 3rem;
         }
      }
   }
`
