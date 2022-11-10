import { MoreVert } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import {BsHeartFill} from 'react-icons/bs'
import {AiFillLike} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import { fetchUsers, getPosts } from "../../../api/axiosFetch";
import {format} from 'timeago.js';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import useContextAuth from '../../UserContext/useContextAuth';
import { FaTimes } from 'react-icons/fa';
//setFollowed, followed
const Posts = ({post, error}) => {
   const [user, setUser] = useState({});
   const {
      loggedInUser, setNewPosts, 
      handleFollow, setGetComment, 
      getComment} = useContextAuth();
   const [like, setLike] = useState(post.likes?.length);
   const [isLiked, setIsLiked] = useState(post?.likes.includes(loggedInUser?._id));
   const [errors, setErrors] = useState(false);
   const [open, setOpen] = useState(false);
   const [confirmDelete, setConfirmDelete] = useState(false);
   const [displayComments, setDisplayComments] = useState(false);
   const commentLengthRef = useRef([]);

   const handleLikes = async() => {

      try{
         const res = await getPosts.put(`/${post._id}/${loggedInUser?._id}/like`)

      }catch(error){
         console.log(error)
      }
      setIsLiked(prev => !prev)
      setLike(prev => isLiked ? prev - 1 : prev + 1); 
   }

   useEffect(() => {
      const getUsers = async() => {
        try{ 
            const res = await fetchUsers(`/query?userId=${post?.userId}`)
            setUser(res.data)
         }
         catch(error){
            console.log(error)
         }
      }
      getUsers()

   }, [post?.userId, isLiked])

   let isError = <h2>No post to display</h2>

   const deletePost = async(postId) => {
      try{
         await getPosts.delete(`/${loggedInUser?._id}/${postId}`)
         setNewPosts(Date.now())
      }
      catch(error){
         setErrors(error)
      }
   }

   useEffect(() => {
      const getLength = () => {

      }
      getLength()

   }, [])

   let deleteContainer = (
      <div className="deleteContainer">
         <div className="deleteBox">
            <div className='confirmDelete'>
               <p className='deleteText'>Confirm post delete</p>
               <button className='button' onClick={() => deletePost(post?._id)}>Confirm</button>
            </div>
            <FaTimes className='cancelDelete' 
                  onClick={() => {
                  setConfirmDelete(prev => !prev)
                  setOpen(false)
               }}
            />
         </div>
      </div>
   )

   let content = (
      <div className="postWrapper">
         <div className="postTop">
            <div className="postTopLeft">
               <Link to={`/profile/${user?.username}`} className='links'>
                  {user?.profilePicture ? (
                     <img src={user?.profilePicture} alt="post" className="postProfileImg" />
                     ) : (
                        <CgProfile style={{fontSize: '28px'}}/>
                     )
                  }
               </Link>
               <Link to={`/profile/${user?.username}`} className='links'>
                  <span className="postUsername">{user?.username}</span>
               </Link>
               <span className="postDate">{format(post?.createdAt)}</span>
            </div>
            <div className="postTopRight">
               <MoreVert className={confirmDelete ? 'none' : ''} onClick={() => setOpen(prev => !prev)} style={{cursor: 'pointer'}}/>
               {open && (
                  loggedInUser?._id === post?.userId ? 
                  <button 
                     className={confirmDelete ? 'none' : ''}
                     onClick={() => setConfirmDelete(prev => !prev)}>Delete</button> : null )
                     //    user?._id !== loggedInUser?._id && (
                     //       <button className='rightFollowButton' 
                     //          onClick={() => handleFollow(user?._id)}>
                     //          {followed?.following.includes(post.userId) ? 
                     //             <span 
                     //                style={followButtonStyle}>UnFollow <FaMinus />
                     //             </span> 
                     //                : 
                     //             <span 
                     //                style={followButtonStyle}>Follow <FaPlus />
                     //             </span> 
                     //          }
                     //       </button>
                     //    )
                     // )
               }
               {confirmDelete && deleteContainer}
            </div>
         </div>
         <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            {post?.img ? 
               <img src={post?.img} alt="post image" className="postImg" onDoubleClick={handleLikes}/> 
                  : ''
            }
         </div>
         <div className="postBottom">
            <div className="postBottomLeft">
               <span className='like' onClick={handleLikes}>
                  <AiFillLike style={{fontSize: '20px', color: isLiked ? 'orangered' : 'white'}}/>
               </span>
               <span className='heart' onClick={handleLikes}>
                  <BsHeartFill style={{fontSize: '16px', color: 'white'}}/>
               </span>
               <span className="postLikeCounter">{
               //  post?.likes.includes(loggedInUser?._id) ? (
               //    <p style={{marginLeft: '110px'}}>You liked this post</p>
               //    ) : (   
                  like < 1 ? 
                     <p style={{marginLeft: '40px'}}>no likes</p>
                     : like === 1 ? 
                        <p style={{marginLeft: '150px'}}>1 person likes this post</p>
                        : 
                           <p style={{marginLeft: '150px'}}>{like} people liked this post</p>
                  //)
               }
               </span>
            </div>
            <div className="postBottomRight">
              {getComment?.length ? getComment?.postId === post?._id &&(
                  <span className="postCommentText" 
                     onClick={
                        () => setDisplayComments(prev => !prev)}>
                     {getComment?.length === 1 ? 
                        getComment?.length + ' comment' : 
                           getComment?.length + ' comments'
                     }
                  </span>
                  ) : (
                  <span className="postCommentText" 
                     onClick={
                     () => setDisplayComments(prev => !prev)
                     }>no comment
                  </span>
                  )
               }
            </div>
         </div>
         {displayComments && <Comments post={post}/>}
      </div>
   )

  return (
    <Container>
      { error ? isError : user && content }
    </Container>
  );
}

export default Posts;

const Container = styled.div`
   width: 100%;
   border-radius: 10px;
   box-shadow: 0px 0px 16px -8px rgba(0,0,0,0.68);
   -webkit-box-shadow: 0px 0px 16px -8px rgba(0,0,0,0.68);
   margin: 30px 0;

   .links{
      padding-top: 0;
      color: black;
      text-decoration: none;
   }

   .rightFollowButton{
      padding: 7px;
      display: flex;
      align-items: center;
      gap: 2px;
      margin-top: 0;
      margin-bottom: 10px;
      background-color: #1877f2;
      border: none;
      color: white;
      font-weight: 500;
      border-radius: 5px;
      cursor: pointer;
      transition: opacity 0.25s ease-in-out;

      &:hover{
         opacity: 0.7;
      }

      &:active{
         opacity: 1;
      }
   }

   .postWrapper{
      padding: 10px;

      .postTop{
         display: flex;
         align-items: center;
         justify-content: space-between;

         .postTopRight{
            position: relative;

            button{
               position: absolute;
               right: 8px;
               top: 22px;
               padding: 7px;
               background-color: #1877f2;
               border: none;
               color: white;
               border-radius: 5px;
               cursor: pointer;
               transition: opacity 0.25s ease-in-out;

               &:hover{
                  opacity: 0.7;
               }

               &:active{
                  opacity: 1;
               }
            }

            .none{
               display: none;
            }

            .deleteContainer{
               position: absolute;
               background-color: rgba(0,0,0,0.4);
               border-radius: 5px;
               width: 200px;
               height: 80px;
               padding: 10px;
               z-index: 20;
               right: -10px;
               top: -28px;
               box-shadow: -2px 4px 15px rgba(0,0,0,0.3);

               .deleteBox{
                  position: relative;


                  .confirmDelete{
                     display: flex;
                     flex-direction: column;
                     align-items: center;
                     justify-content: center;

                     .deleteText{
                        color: white;
                        text-transform: capitalize;
                     }

                     .button{
                        padding: 7px;
                        background-color: red;
                        border: none;
                        color: white;
                        margin-right: 50px;
                        margin-top: 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: opacity 0.25s ease-in-out;

                        &:hover{
                           opacity: 0.7;
                        }

                        &:active{
                           opacity: 1;
                        }
                     }
                  }

                  .cancelDelete{
                     position: absolute;
                     top: -5px;
                     right: -7px;
                     font-size: 18px;
                     color: white;
                     cursor: pointer;
                  }
               }
            }
         }

         .postTopLeft{
            display: flex;
            align-items: center;

            .postProfileImg{
               width: 32px;
               height: 32px;
               border-radius: 50%;
               object-fit: cover;
            }

            .postUsername{
               font-size: 16px;
               font-weight: 500;
               padding-top: 0;
               margin: 0 10px;
            }

            .postDate{
               font-size: 12px;
            }
         }
      }

      .postCenter{
         margin: 20px 0;
         
         .postImg{
            margin-top: 10px;
            width: 100%;
            max-height: 500px;
            object-fit: cover;
            object-position: center;
         }
      }

      .postBottom{
         display: flex;
         align-items: center;
         justify-content: space-between;

         .postBottomLeft{
            flex: 60%;
            display: flex;
            align-items: center;

            @media (max-width: 768px){
               flex: 50%;
            }

            span{
               width: 30px;
               height: 30px;
               border-radius: 50%;
               display: flex;
               justify-content: center;
               align-items: center;
               cursor: pointer;
            }

            .like{
               background-color: blue;
               margin-right: 5px;
            }

            .heart{
               background-color: orangered;
            }

            .postLikeCounter{
               font-size: 15px;
               white-space: nowrap;
            }
         }

         .postBottomRight{
            flex: 2;
            display: flex;
            justify-content: flex-end;

            .postCommentText{
               cursor: pointer;
               border-bottom: 1px dashed gray;
               font-size: 15px;
            }
         }
      }
   }
`

const followButtonStyle = {
   display:'flex', alignItems:'center', gap:'0.2rem'
}