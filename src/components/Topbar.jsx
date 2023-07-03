import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import {Link} from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import useContextAuth from '../UserContext/useContextAuth';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
   const [show, setShow] = useState(false);
   const {pathname} = useLocation();
   const {loggedInUserId, users, reveal, setReveal, setRightBar, handleLogout, search, setSearch, searchResults, setLeftBar} = useContextAuth();
   //console.log(pathname.split('/')[1])
  
   let optionContainer = (
      <div style={option} className='rights'>
         <div style={optionsList}>
            <p style={links} className='hovers'><Link to='/' className='links'>Home</Link></p>
            <p style={links} className='hovers'><Link className='links'>Mode</Link></p>
            <p style={links} className='hovers'><Link to={`/profile/${users?.userData?.username}`} className='links'>Profile</Link></p>
            <p style={links} className='hovers logout' onClick={handleLogout}>Logout</p>
         </div>
      </div>
   )

   let searchContainer = (
      <div className="searchContainer">
         {searchResults?.length ? 
            searchResults.map((yourSearch) => (
               <Link key={yourSearch?._id} className='links' to={`/profile/${yourSearch?.username}`}>
                  <p className="searchContent">
                     <span>{yourSearch?.username}</span>
                     {yourSearch?.profilePicture ? 
                        (
                        <img 
                           src={yourSearch.profilePicture} 
                           alt={yourSearch.username} className="profilePic" />
                        ) : (
                           <CgProfile className='noPicture'/>
                        )
                     }
                  </p>
               </Link>
            )) : (
               <p style={{textAlign:'center', marginTop:'10px'}}>User not found</p>
            )
         }
         <FaArrowDown className='arrowDown'/>
      </div>
   )

   return (
    <Container>
         <div className="topbarLeft" onClick={() => {
            setReveal(false)
            setSearch('')
            }}>
            <button 
               title='display left bar' 
               className='burger' 
               onClick={() => {
                  setLeftBar(prev => !prev)
                  setRightBar(true)
               }}   
            >&#9776;</button>
            <Link className='links' to='/'>
               <span className="logo">Oluwatobby</span>
            </Link>
         </div>
         <div className="topbarCenter">
            <div className="searchBar">
               <Search className='search-icon' onClick={() => setReveal(prev => !prev)}/>
               <input 
                  type="text" 
                  className="search-input"
                  value={search}
                  placeholder='Search for friend post'
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key && setReveal(true)}
               />
               {reveal && searchContainer}
            </div>
         </div>
         <div className="topbarRight" 
            onClick={() => {
            setReveal(false)
            setSearch('')
            }}>
            <div className="topbarLinks">
               <Link className='links' to='/'>
                  <span className="topbarLink">Homepage</span>
               </Link>
               <Link className='links'>
                  <span className="topbarLink">Timeline</span>
               </Link>
            </div>
            <div className={`topbarIcons ${show && 'none'}`} display={pathname.split('/')[1] === 'messenger' ? true : false}>
               <FaArrowRight onClick={() => {
                  setRightBar(prev => !prev)
                  setLeftBar(false)
               }} 
               className='arrow-right'
               />
               <div className="topbarIconItem">
                  <Person />
                  <span className="counterBadge">1</span>
               </div>
               <Link to='/messenger'>
                  <div className="topbarIconItem">
                     <Chat />
                     <span className="counterBadge">1</span>
                  </div>
               </Link>
               <div className="topbarIconItem">
                  <Notifications />
                  <span className="counterBadge">1</span>
               </div>
            </div>
            <div style={{position: 'relative', transition:'all 0.25s ease-in-out'}}>
               {users?.userData?.profilePicture ?
               <img src={users?.userData?.profilePicture} alt="profile" className="topbarImg" onClick={() => setShow(prev => !prev)}/> : <CgProfile 
                              style={{fontSize: '28px', cursor: 'pointer'}}
                              onClick={() => setShow(prev => !prev)}   
                           />
               }
               {show && optionContainer}
            </div>
         </div>
    </Container>
  );
}

export default Topbar;

const Container = styled.div`
   height: 50px;
   width: 100%;
   background-color: #1877f2;
   display: flex;
   align-items: center;
   position: sticky;
   top: 0;
   z-index: 999;

   .links{
      text-decoration: none;
      color: white;
   }

   .hovers{
      color: white;

      &:hover{
         filter: brightness(0.7);
         border-bottom: 1px solid lightblue;
         padding-bottom: 1px;
         border-radius: 5px;
         background-color: rgba(24,119,242,0.4);
         color: black;

         .links{
            color: black;
         }
      }

      &:active{
         filter: brightness(1);
      }
   }

   .logout{
      background-color: rgba(24,119,242,0.4);
      border-radius: 5px;

      &:hover{
         color: black;
      }
   }

   .topbarLeft{
      flex: 3;

      .burger{
         display: none;
      }
      
      .logo{
         font-size: 24px;
         margin-left: 20px;
         font-weight: bold;
         color: white;
         cursor: pointer;
      }
   }

   .topbarCenter{
      flex: 5;

      .searchBar{
         width: 100%:
         height: 50px;
         background-color: white;
         border-radius: 20px;
         display: flex;
         align-items: center;
         gap: 5px;
         position: relative;

         .search-icon{
            font-size: 24px !important;
            margin-left: 10px;
            cursor: pointer;
         }

         .search-input{
            border: none;
            height: 35px;
            width: 92%;
            font-size: 17px;
            border-radius: 20px;
            box-sizing: border-box;

            &:focus{
               outline: none;
            }
         }

         .searchContainer{
            width: 100%;
            border-radius: 10px;
            background-color: rgba(0,0,0,0.8);
            padding: 15px 10px;
            position: absolute;
            top: 35px;
            max-height: 110px;
            overflow-y: scroll;
            color: white;

            .searchContent{
               border-bottom: 1px solid gray;
               padding: 0 10px 2px 10px;
               margin-bottom: 10px;
               display: flex;
               align-items: center;
               justify-content: space-between;
               cursor: pointer;
               transition: all 0.24s ease-in-out;

               &:hover{
                  background-color: rgba(0,0,0,0.2);
                  border-radius: 5px;
                  padding: 2px;
               }

               &:active{
                  background-color: rgba(0,0,0,0.4);
               }

               span{
                  padding-left: 5px;
                  text-transform: capitalize;
               }

               .profilePic{
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  object-fit: cover;
               }

               .noPicture{
                  font-size: 36px;
               }
            }

            &::-webkit-scrollbar{
               width: 0;
            }
            &::-webkit-scrollbar-track{
               background-color: #f1f1f1;
            }
            &::-webkit-scrollbar-thumb{
               background-color: rgb(179, 179, 179);
            }

            .arrowDown{
               color: lightgray;
               left: 45%;
               //right: 25%;
               position: fixed;
               top: 130px;
               font-size: 20px;
            }
         }
      }
   }

   .topbarRight{
      flex: 4;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: white;

      .topbarLinks{
   
   
         .topbarLink{
            margin-right: 10px;
            font-size: 14px;
            cursor: pointer;
         }
      }

      .topbarIcons{
         display: flex;

         .arrow-right{
            display: none;
         }

         .topbarIconItem{
            margin-right: 15px;
            cursor: pointer;
            color: white;
            position: relative;

            .counterBadge{
               width: 15px;
               height: 15px;
               background-color: red;
               border-radius: 50%;
               color: white;
               position: absolute;
               top: -5px;
               right: -5px;
               display: flex;
               align-items: center;
               justify-content: center;
               font-size: 12px;
            }
         }
      }

      .topbarImg{
         width: 32px;
         height: 32px;
         object-fit: cover;
         border-radius: 50%;
         cursor: pointer;
      }
   }

   @media (max-width: 908px){
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      
      .topbarLeft{
         flex: 3;
         display: flex;
         align-items: center;
         margin-left: 10px; 

         .logo{
            
         }

         .burger{
            display: block;
            color: rgba(0,0,0,0.6);
            font-size: 32px;
            cursor: pointer;
            border: none;
            background-color: transparent;
         }
      }

      .topbarCenter{
         flex: 5;
         margin-left: 1rem;

         .searchBar{


            .search-icon{

            }

            .search-input{

            }

            .searchContainer{
               z-index: 10;

               .searchContent{

               }
            }
         }
      }

      .topbarRight{
         flex: 2;

         position: relative;

         .topbarLinks{
            display: none;

            .topbarLink{

            }
         }

         .topbarIcons{
            position: absolute;
            display: flex;
            flex-direction: column;
            top: 40px;
            right: 0;
            gap: 5px;
            padding: 12px 0 5px 10px;
            background-color: rgba(24,119,242,0.9);
            border-radius: 0 0 5px 5px;

            .arrow-right{
               display: block;
               text-align: center;
               top: 50px;
               right: 5px;
               font-size: 22px;
               color: white;
               cursor: pointer;
               transition: all 0.3s ease-in;
            
               &:hover{
               background-color: rgba(0,0,0,0.5);
               color: lightgray;
               }
            }

            .topbarIconItem{

            }
         }

         .none{
            display: none;
         }

         .topbarImg{

         }
      }
   }
`

const option = {
   height: '130px', width: '100px', borderRadius: '0 0 5px 5px', backgroundColor: 'rgba(24,119,242,0.8)', position: 'absolute', top: '40px', right: '-28px', zIndex: '999'
}
//1877f2
const optionsList = {
   listStyle: 'none', textDecoration: 'none', padding: '5px', display: 'flex', flexDirection: 'column', gap: '0.2rem', transition: 'all 0.25s ease-in-out'
}

const links = {
   cursor: 'pointer',
   color: 'white',
   width: '100%',
   padding: '4px 0',
   textAlign: 'center',
   borderBottom: '1px solid rgba(0,0,0,0.2)',
}
