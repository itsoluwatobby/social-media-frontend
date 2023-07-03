import React, { useEffect, useState } from 'react';
import {BsGiftFill} from 'react-icons/bs'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUsers } from '../api/axiosFetch';
import { users as userD } from '../../data';
import useContextAuth from '../UserContext/useContextAuth';
import OnlineUsers from './OnlineUsers';

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');
  const {loggedInUserId, users, setReveal, setSearch, followed, reload, setFollowed, handleFollow, rightBar, setRightBar} = useContextAuth();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true)
    const getFriends = async() => {
      try{
        const friendList = await fetchUsers(`/friends/${user?._id}`)
        setFriends(friendList?.data)
      }
      catch(error){
        setLoading(false)
        !error.response && setError('no response')
        error.response?.status === 400 && setError('You are not following anyone yet!')
        error.response?.status === 500 && setError('Please try again later');
      }finally{
        setFollowed(users?.userData?.following.includes(user?._id))
        setLoading(false)
      }
    }
    getFriends()

  }, [user, followed, reload])

  // const handleFollow = async() => {
  //   try{
  //       followed ? await fetchUsers.put(`/${loggedInUser?._id}/unfollow`, {id: user?._id}) : await fetchUsers.put(`/${loggedInUser?._id}/follow`, {id: user?._id});
  //       setFollowed(prev => !prev)
        
  //       const res = await fetchUsers(`/query?userId=${loggedInUser?._id}`)
     
  //       await localStorage.removeItem('isLoggedIn')
  //       await JSON.stringify(localStorage.setItem('isLoggedIn', JSON.stringify(res?.data)))
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // }

  let fetching = <p>Please wait ...</p>

  let HomeContent = (
      <div className={`container ${rightBar ? 'none' : ''}`}>
        <div className="navButton">
          <FaTimes 
            className='cancel' 
            title='rightbar'
            onClick={() => setRightBar(prev => !prev)}/>
        </div>
        <div className="birthdayContainer">
          <BsGiftFill className='gift'/>
          <span className="birthdayText"><b style={{cursor: 'pointer'}}>Pola Foster</b> and <b style={{cursor: 'pointer'}}>3 other friends</b> have a birthday today.</span>
        </div>
          <img src="https://images.unsplash.com/photo-1519417688547-61e5d5338ab0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" alt="Ads" className="rightbarAd" />
          <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {userD?.map(use => (
              <OnlineUsers key={use.id} user={use}/>
            ))
          }
        </ul>
      </div>
  )
  
  const relationship = (user?.relationship < 1 || user?.relationship === 1) ? <p>No Status</p> : user?.relationship === 2 ? <p>Married</p> : <p>Divorced</p>

  let ProfileContent = (
      <>
      {user?._id !== users?.userData?._id && (
        <button className='rightFollowButton' 
          onClick={() => handleFollow(user?._id)}>
            {followed ? 
              <span 
                style={
                  {display:'flex', alignItems:'center', gap:'0.2rem'}}>UnFollow <FaMinus />
              </span> 
                : 
              <span 
                  style={
                    {display:'flex', alignItems:'center', gap:'0.2rem'}}>Follow <FaPlus />
              </span> 
            }
        </button>
      )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">{loggedInUserId === user?._id ? 'Your' : user?.username} Friends</h4>
        {loading ? fetching 
        : (
          <div className="userFollowings">
            {friends?.length ? (
              friends.map(friend => (
                <Link key={friend?._id} to={`/profile/${friend?.username}`} className='links'>
                  <div className="following">
                    <img src={friend?.profilePicture} alt='friends' className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">{friend?.username}</span>
                  </div>
                </Link>
                ))
              ) 
                : (
                  <p>{error}</p>
                )
            }
          </div>
          )
        }
      </>
  )

  return (
    <Container
      onClick={() => {
            setReveal(false)
            setSearch('')
            }}
    >
      <div className="rightbarWrapper">
        {!user ? HomeContent : ProfileContent}
      </div>
    </Container>
  );
}

export default Rightbar;

const Container = styled.div`
  flex: 3.5;

  .navButton{
    display: none;
  }

  .rightFollowButton{
    right: 8px;
    top: 22px;
    padding: 7px;
    display: flex;
    align-items: center;
    gap: 2px;
    margin-top: 30px;
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

  .links{
    padding-top: 0;
    color: black;
    text-decoration: none;
  }

  .rightbarWrapper{
    padding: 20px 20px 20px 10px;

    .birthdayContainer{
      display: flex;
      align-items: center;

      .gift{
        color: orangered;
        font-size: 24px;
        margin-right: 10px;
      }

      .birthdayText{
        font-size: 15px;
        font-weight: 300;
      }
    }

    .rightbarAd{
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 10px;
      margin: 30px 0;
    }

    .rightbarTitle{
      margin-bottom: 20px;
    }

    .rightbarFriendList{
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .rightbarTitle{
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .rightbarInfo{
      margin-bottom: 30px;
      width: 100%;

      .rightbarInfoItem{
        margin-bottom: 10px;
        display: flex;
        flex-wrap: nowrap;

        .rightbarInfoKey{
          font-weight: 500;
          margin-right: 15px;
          color: #555;
        }

        .rightbarInfoValue{
          font-weight: 300;
        }
      }
    }

    .userFollowings{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .following{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        cursor: pointer;

        .rightbarFollowingImg{
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 5px;
        }

        .rightbarFollowingName{

        }
      }
    }
  }

  @media (max-width: 908px){
    overflow-y: scroll;

    .container.none{
      display: none;
    }

    .container{
      position: fixed;
      top: 50px;
      right: -30px;
      width: 60%;
      padding: 20px 20px 20px 10px;
      z-index: 999;
      background-color: white;
      box-shadow: 2px 4px 12px rgba(0,0,0,0.3);
      overflow-y: scroll;
      
      .navButton{
        display: block;

        .cancel{
          font-size: 20px;
          color: rgba(0,0,0,0.2);
          background-color: rgba(0,0,0,0.15);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease-in;

          &:hover{
            color: rgba(0,0,0,0.3);
            background-color: rgba(0,0,0,0.3);
          }
        }
      }

      .birthdayContainer{
        flex-direction: column;

        .gift{
          font-size: 56px;
        }

        .birthdayText{
          font-size: 18px;

        }
      }

      .rightbarAd{
        
      }

      .rightbarTitle{
      
      }

      .rightbarFriendList{
      
      }
    }

    &::-webkit-scrollbar{
        width: 1px;
    }

    &::-webkit-scrollbar-track{
        background-color: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb{
        background-color: rgb(179, 179, 179);
    }
  }
`