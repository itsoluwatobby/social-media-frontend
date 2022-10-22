import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authUsers } from '../../api/axiosFetch';
import Spinner from '../assets/Spinner';

const Login = () => {
   const [show, setShow] = useState(false);
   const inputRef = useRef();
   const navigate = useNavigate();
   const [error, setError] = useState(''); 
   const [loading, setLoading] = useState(false);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   useEffect(() => {
      inputRef.current.focus()
   }, [])

   const handleLogin = async(e) => {
      e.preventDefault()
      setLoading(true)
      try{ 
         const response = await authUsers.post('/login', 
            {username, password},
            {
               headers: {
               'Content-Type': 'application/json'
               },
               withCredentials: true
            }
         )
         JSON.stringify(localStorage.setItem('isLoggedIn', JSON.stringify(response?.data)))
         navigate('/')
         setUsername('')
         setPassword('')
      }
      catch(error){
         setLoading(false)
         !error.response && setError('No Server Response')
         error.response?.status === 403 && setError('Bad Credentials')
         error.response?.status === 400 && setError('Invalid Input')
      }
      finally{
         setLoading(false)
      }
      await setTimeout(() => {
         setError(false)
      }, 2000);
   }

   const canSaveLogIn = Boolean(username) && Boolean(password)

   let errorContent = ( 
      <div style={errorStyle}>
         <p>
            {error}
         </p>
      </div>     
   )

   let content = (
    <Container>
      <div className="loginWrapper">
         <div className="loginLeft">
            <h3 className="loginLogo">Oluwatobby</h3>
            <span className="loginDesc">Connect with friends and the world around you on Oluwatobby</span>
         </div>
         <form onSubmit={handleLogin} className="loginRight">
            <div className="loginBox">
               {error && errorContent}
               <input 
                  type="text" 
                  ref={inputRef}
                  placeholder='Username'
                  autoComplete='off'
                  value= {username}
                  className="loginInput" 
                  onChange={e => setUsername(e.target.value)}   
               />
               <div className="pass">
                  <input 
                     type={show ? "text" : "password"} 
                     placeholder='Password' 
                     value= {password}
                     autoComplete='off'
                     className="loginInput" 
                     onChange={e => setPassword(e.target.value)}   
                  />
                  {show ? 
                     <AiFillEyeInvisible 
                        onClick={
                           () => setShow(prev => !prev)}
                           className='eyePass'
                     /> : 
                     <AiFillEye 
                        onClick={
                           () => setShow(prev => !prev)}
                           className='eyePass'
                     />
                  }
               </div>
               <button 
                  type="submit" 
                  className={!canSaveLogIn ? 'none' : 'loginButton'} 
                     disabled={!canSaveLogIn}
                     >Sign in</button>
               <span className="loginForgot">Forgot Password?</span>
               <button 
                  type='button' 
                  className="loginRegisterButton"
                  >
                     <Link className='links' to='/register'>Create a New Account</Link>
               </button>
            </div>
         </form>
      </div>
    </Container>
  );

  return loading ? <Spinner /> : content
}

export default Login;

const Container = styled.div`
   width: 100%;
   height: 100vh;
   background-color: #f0f2f5;
   display: flex;
   align-items: center;
   justify-content: center;

   .loginWrapper{
      width: 70%;
      height: 70%;
      display: flex;

      .loginLeft, 
      .loginRight{
         flex: 1;
         display: flex;
         flex-direction: column;
         justify-content: center;
      }

      .loginLeft{

         .loginLogo{
            font-size: 50px;
            font-weight: 800;
            color: #1775ee;
         }

         .loginDesc{
            font-size: 24px;
         }
      }

      .loginRight{
         position: relative;

         .loginBox{
            height: 300px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            box-shadow: -2px 4px 16px rgba(0,0,0,0.2);
            justify-content: space-between;

            .loginInput{
               height: 50px;
               border-radius: 10px;
               border: 1px solid gray;
               font-size: 18px;
               padding-left: 10px;

               &:focus{
                  outline: none
               }
            }

            .pass{
               display: flex;
               align-items: center;
               border-radius: 10px;
               border: 1px solid gray;
               position: relative;

               .eyePass{
                  position: absolute;
                  right: 5px;
                  font-size: 28px;
                  cursor: pointer;
                  color: rgba(0,0,0,0.8);
               }

               .loginInput{
                  border: none;
                  border-radius: 10px;
                  flex: 2;
                  box-sizing: object-fit;
               }
            }

            .loginButton{
               height: 50px;
               border-radius: 10px;
               border: none;
               background-color: #1775ee;
               color: white;
               font-size: 20px;
               font-weight: 500;
               cursor: pointer;
               transition: all 0.25s ease-in-out;

               &:hover{
                  filter: brightness(0.7);
                  color: white;
               }

               &:active{
                  filter: brightness(1);
               }
            }

            .loginForgot{
               text-align: center;
               color: #1775ee;
               cursor: pointer;
            }

            .loginRegisterButton{
               height: 35px;
               width: 70%;
               margin: 0 auto;
               border-radius: 10px;
               border: none;
               background-color: #42b72a;
               color: white;
               font-size: 20px;
               font-weight: 500;
               cursor: pointer;
               transition: all 0.25s ease-in-out;

               &:hover{
                  filter: brightness(0.7);
                  color: white;
               }

               &:active{
                  filter: brightness(1);
               }

               .links{
                  color: white;
                  text-decoration: none;
               }
            }

            .none{
               height: 50px;
               border-radius: 10px;
               border: none;
               background-color: lightgray;
               color: white;
               font-size: 20px;
               font-weight: 500;
               cursor: pointer;
               transition: all 0.25s ease-in-out;
            }
         }
      }

      @media (max-width: 768px){
         flex-direction: column;
         gap: 1rem;
      }
   }

   @media (max-width: 768px){
      align-items: flex-start;
      padding-top: 4rem;
   }
`
const errorStyle={
   display: 'flex', width: '72%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: '10px', padding: '18px', color: 'red', fontSize: '24px', right: '50px', top: '40px', zIndex: '5', position: 'absolute', whiteSpace: 'nowrap'
}