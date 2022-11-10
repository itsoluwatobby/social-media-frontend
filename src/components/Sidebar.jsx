import React from 'react';
import Topbar from '../components/Topbar';
import styled from 'styled-components';
import { RssFeed, Chat, HelpOutline, WorkOutline, School, Event, Bookmark, Group, PlayCircleFilledOutlined } from '@mui/icons-material';
import { users } from '../../data';
import {Link} from 'react-router-dom';
import CloseFriends from './closeFriends/CloseFriends';
import useContextAuth from '../UserContext/useContextAuth';

const Sidebar = () => {
   const {setReveal, setSearch, leftBar} = useContextAuth()

  return (
   <Container onClick={() => {
            setReveal(false)
            setSearch('')
            }} show={leftBar}>
      <div className="sidebarWrapper">
         <ul className="sidebarList">
            <li className="sidebarListItem">
               <RssFeed className='sidebarIcon'/>
               <span className="sidebarListItemText">Feed</span>
            </li>
            <Link to='/messenger' style={{color:'black', textDecoration:'none'}}>
            <li className="sidebarListItem">
               <Chat className='sidebarIcon'/>
               <span className="sidebarListItemText">Chat</span>
            </li>
            </Link>
            <li className="sidebarListItem">
               <PlayCircleFilledOutlined className='sidebarIcon'/>
               <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
               <Group className='sidebarIcon'/>
               <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
               <Bookmark className='sidebarIcon'/>
               <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
               <HelpOutline className='sidebarIcon'/>
               <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
               <WorkOutline className='sidebarIcon'/>
               <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
               <Event className='sidebarIcon'/>
               <span className="sidebarListItemText">Event</span>
            </li>
            <li className="sidebarListItem">
               <School className='sidebarIcon'/>
               <span className="sidebarListItemText">Courses</span>
            </li>
         </ul>
         <button className="sidebar-button">Show more</button>
         <hr className='sidebarHr'/>

         <ul className="sidebarFriendList">
            {users.map(user => (
                  <CloseFriends key={user.id} user={user} />
               ))
            }
         </ul>
      </div>
   </Container>
  );
}

export default Sidebar;

const Container = styled.div`
   flex: 3;
   height: calc(100vh - 50px);
   overflow-y: scroll;
   position: sticky;
   top: 50px;

   .sidebarWrapper{
      padding: 20px;

      .sidebarList{
         padding: 0;
         margin: 0;
         list-style: none;

         .sidebarListItem{
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            .sidebarIcon{
               margin-right: 15px;
            }
         }
      }

      .sidebar-button{
         width: 150px;
         border: none;
         padding: 10px;
         font-weight: 500;
         border-radius: 5px;
         cursor: pointer;
      }

      .sidebarHr{
         margin: 20px 0;
      }

      .sidebarFriendList{
         padding: 0;
         margin:0;
         list-style: none;
      }
   }

   &::-webkit-scrollbar{
      width: 5px;
   }
   &::-webkit-scrollbar-track{
      background-color: #f1f1f1;
   }
   &::-webkit-scrollbar-thumb{
      background-color: rgb(179, 179, 179);
   }

   @media (max-width: 908px){
      position: absolute;
      display: ${props => props.show ? '' : 'none'};
      left: -0.5rem;
      top: -0.2rem;
      z-index: 10;
      background-color: white;

      .sidebarWrapper{
         padding-right: 5px;
      }
   }
`