import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const ForgetPassword = () => {
   const [email, setEmail] = useState('');
   const emailRef = useRef();
   const navigate = useNavigate();
   const [error, setError] = useState('');
   const [sentLink, setSentLink] = useState(false)

   useEffect(() => {
      emailRef.current.focus()
      setSentLink(false)
   }, []);

   const handleForgetPassword = async(e) => {
      e.preventDefault()
      console.log(email)
      setEmail('')
      setSentLink(true)
   }

   const canSubmit = Boolean(email.includes('@') && email.includes('.'))

   let errorContent = ( 
      <div style={errorStyle}>
         <p>
            {error}
         </p>
      </div>     
   )

  return (
    <Container>
      <div className="loginWrapper">
         <div className="loginLeft">
            <h3 className="loginLogo">Oluwatobby</h3>
            <span className="loginDesc">Connect with friends and the world around you on Oluwatobby</span>
         </div>
         <form onSubmit={handleForgetPassword} className="loginRight">
            <div className="loginBox">
               {error && errorContent}
               <input 
                  type="email" 
                  ref={emailRef}
                  placeholder='Enter email'
                  autoComplete='off'
                  value= {email}
                  className="loginInput" 
                  onChange={e => setEmail(e.target.value)}   
               />
               <button 
                  type="submit" 
                  className={!canSubmit ? 'none' : 'loginButton'} 
                     disabled={!canSubmit}
                     >Reset Password</button>
               {sentLink && <span className="loginForgot">Password reset Link has been sent to your email</span>}
               <button 
                  type='button' 
                  className="loginRegisterButton"
                  >
                     <Link className='links' to='/login'>Login into your Account</Link>
               </button>
            </div>
         </form>
      </div>
    </Container>
  );
}

export default ForgetPassword;

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
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            display: flex;
            gap: 1rem;
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

            .loginButton{
               height: 45px;
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
               width: 80%;
               margin: 0 auto;
               border-radius: 10px;
               padding: 5px;
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