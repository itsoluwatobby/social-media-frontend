import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Feed from '../components/Feed/Feed';
import Rightbar from '../components/Rightbar';
import Sidebar from '../components/Sidebar';
import {CgProfile} from 'react-icons/cg'
import { useLocation } from 'react-router-dom';
import { fetchUsers } from '../api/axiosFetch';
import useContextAuth from '../UserContext/useContextAuth';

const Profile = () => {
   const {loggedInUserId, setReveal, setSearch} = useContextAuth();
   const [user, setUser] = useState({});
   const location = useLocation();
   const username = location.pathname.split('/')[2];

   useEffect(() => {
      const controller = new AbortController()
      const getUser = async() => {
         try{
            const res = await fetchUsers.get(`/query?username=${username}`, {
               signal: controller.signal
            })
            setUser(res.data)
         }
         catch(error){
            console.log(error)
         }         
      }
      getUser()

      return () => controller.abort()
   }, [username])

  return (
    <Container
      onClick={() => {
            setReveal(false)
            setSearch('')
            }}
    >
      <div className="profile">
         <Sidebar />
         <div className="profileRight">
            <div className="profileRightTop">
               <div className="profileCover">
                  {user?.profilePicture ?
                     <img src={user?.profilePicture} alt="cover picture" className="profileCoverImg" />
                     : <CgProfile style={{fontSize: '12rem'}}/>
                  }
                  {user?.coverPicture ?
                     <img src={user?.coverPicture} alt="cover picture" className="profileUserImg" />
                     : <CgProfile className="profileUserImg" />
                  }
               </div>
               <div className="profileInfo">
                  <h4 className='profileInfoName'>{user?.username}</h4>
                  <span className='profileInfoDesc'>{user?.desc}</span>
               </div>
            </div>
            <div className="profileRightBottom">
               <Feed username={username} />
               <Rightbar user={user}/>
            </div>
         </div>
      </div>
    </Container>
  );
}

export default Profile;

const Container = styled.div`

   .profile{
      display: flex;

      .profileRight{
         flex: 9;

         .profileRightTop{


            .profileCover{
               height: 320px;
               position: relative;
            }

            .profileCoverImg{
               width: 100%;
               height: 250px;
               object-fit: cover;
            }

            .profileUserImg{
               width: 150px;
               height: 150px;
               border-radius: 50%;
               object-fit: cover;
               position: absolute;
               left: 0;
               right: 0;
               margin: auto;
               top: 170px;
               border: 3px solid white;
            }

            .profileInfo{
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               margin: 1rem 0;
               
               .profileInfoName{
                  font-size: 24px;
               }

               .profileInfoDesc{
                  font-weight: 300;
               }
            }
         }

         .profileRightBottom{
            display: flex;
         }
      }
   }
`