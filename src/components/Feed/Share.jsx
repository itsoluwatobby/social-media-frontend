import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaTimes, FaTimesCircle } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../../../api/axiosFetch';
import useContextAuth from '../../UserContext/useContextAuth';

const Share = () => {
   const {loggedInUser, setNewPosts} = useContextAuth();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('')
   const [desc, setDesc] = useState('')
   const [photo, setPhoto] = useState(null)
//, img: photo.name
// 
   const submitPosts = async(e) => {
      e.preventDefault()
      try{
         if(desc !== '' && !photo){
            setLoading(true)
            const newPost = {userId: loggedInUser._id, desc}
            const res = await getPosts.post('/', newPost)
            setNewPosts(res.data)
            setDesc('')
            setPhoto(null)
         }
         else {
            setLoading(true)
            const newPost = {userId: loggedInUser._id, desc, img: photo}
            const data = new FormData()
            const filename = Date.now() + photo.name;
            data.append("img", filename)
            data.append("userId", loggedInUser._id)
            data.append("desc", desc)
          
            const res = await getPosts.post('/', data, {
               headers: {"Content-Type": "multipart/form-data"}
            })
            setNewPosts(res.data)
            setDesc('')
            setPhoto(null)
         }
      }catch(error){
         setLoading(false)
         setError(true)
      }finally{
         setLoading(false)
      }
   }

   const canSubmit = Boolean(desc)
    
   return (
    <Container> 
      <div className="shareWrapper">
         <div className="shareTop">
            <Link to={`/profile/${loggedInUser?.username}`} className='links'>
            {loggedInUser?.profilePicture ?  (
               <img src={loggedInUser?.profilePicture} alt="profile picture" className="shareProfileImg" />
               ) : ( <CgProfile style={{fontSize: '32px', marginRight: '1rem', cursor: 'pointer'}}/> )
            }
            </Link>
            <input
               type="text" 
               className="shareInput"
               value={desc}
               maxLength={150}
               required
               onKeyDown={e => e.key === 'Enter' && submitPosts(e)}
               placeholder={`Whats on your mind ${loggedInUser?.username}`}
               onChange={(e) => setDesc(e.target.value)}
            />
         </div>
         {loading && <p style={{ textAlign: 'center',fontSize: '18px', letterSpacing: '2px'}}>Submitting post ...</p>}
         <hr className='share-me'/>
         {photo && (
            <div className="shareImgContainer">
               <img src={URL.createObjectURL(photo)} alt="upload" className='shareImg'/>
               <FaTimesCircle className='shareCancelImg' onClick={() => setPhoto(null)}/>
            </div>
         )}
         <form onSubmit={submitPosts} className="shareButton">
            <div className="share-options">
               <div className="share-option">
                  <label htmlFor='photo' className='share-option-text'>
                  <PermMedia htmlColor='tomato' className='share-icon'/>
                  {photo? 'file added' : 'Photo'}</label>
                  <input type='file' id='photo' accept='.png, .jpeg, .jpg' name='photo' onChange={(e) => setPhoto(e.target.files[0])} style={{display: 'none'}}/>
               </div>
               <div className="share-option">
                  <Label htmlColor='blue' className='share-icon'/>
                  <span className='share-option-text'>Tag</span>
               </div>
               <div className="share-option">
                  <Room htmlColor='green' className='share-icon'/>
                  <span className='share-option-text'>Location</span>
               </div>
               <div className="share-option">
                  <EmojiEmotions htmlColor='goldenrod' className='share-icon'/>
                  <span className='share-option-text'>Feelings</span>
               </div>
            </div>
            <button 
               type="submit" 
               disabled={!canSubmit}
               className={!canSubmit ? 'none' : 'share-button'}>Share</button>
         </form>
      </div>
    </Container>
  );
}

export default Share;

const Container = styled.div`
   width: 100%;
   border-radius: 10px;
   box-shadow: 0px 0px 16px -8px rgba(0,0,0,0.68);
   -webkit-box-shadow: 0px 0px 16px -8px rgba(0,0,0,0.68);

   .shareWrapper{
      padding: 10px;

      .shareTop{
         display: flex;
         align-items: center;
      
         .shareProfileImg{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
            cursor: pointer;
         }

         .shareInput{
            border: none;
            width: 80%;
            font-size: 18px;

            &:focus{
               outline: none;
            }
         }
      }

      .share-me{
         margin: 15px;
      }

      .shareImgContainer{
         padding: 0 20px 10px 20px;
         position: relative;

         .shareImg{
            width: 100%;
            height: auto;
            object-fit: cover;
         }

         .shareCancelImg{
            position: absolute;
            top: 0;
            right: 20px;
            cursor: pointer;
            opacity: 0.5;
            font-size: 24px;
            transition: opacity 0.24s ease-in;

            &:hover{
               opacity: 0.8;
            }
         }
      }

      .shareButton{
         display: flex;
         align-items: center;
         justify-content: space-between;

         .share-options{
            display: flex;
            margin-left: 20px;

            @media (min-width: 768px){
               gap: 2rem;
            }

            .share-option{
               display: flex;
               align-items: center;
               margin-right: 15px;
               cursor: pointer;

               .share-option-text{
                  display: flex;
                  align-items: center;
                  cursor: pointer;
                  font-size: 14px;
                  font-weight: 500;

                  .share-icon{
                     font-size: 18px;
                     margin-right: 3px;
                  }
               }
            }
         }

         .share-button{
            border: none;
            padding: 7px;
            border-radius: 5px;
            cursor: pointer;
            background-color: green;
            font-weight: 500;
            margin-right: 20px;
            color: white;
            transition: opacity 0.2s ease-in;

            &:hover{
               opacity: 0.85;
            }
            &:active{
               opacity: 1;
            }
         }

         .none{
            border-radius: 5px;
            padding: 7px;
            border: none;
            background-color: lightgray;
            color: white;
            font-weight: 500;
            margin-right: 20px;
            cursor: pointer;
         }
      }
   }
`