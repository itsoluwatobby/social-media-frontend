import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { authUsers } from "../../api/axiosFetch";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{4,25}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,24}$/

const Register = () => {
   const navigate = useNavigate();
   const [show, setShow] = useState(false);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const [validUsername, setValidUsername] = useState(false);
   const [validPassword, setValidPassword] = useState(false);
   const [match, setMatch] = useState(false);
   const [success, setSuccess] = useState(false);
   const [register, setRegister] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
   });

   const {username, email, password, confirmPassword} = register;

   const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value
      setRegister({...register, [name]: value})
   }

   useEffect(() => {
      const result = USER_REGEX.test(username)
      setValidUsername(result)
   }, [username])

   useEffect(() => {
      const validPass = PASSWORD_REGEX.test(password)
      setValidPassword(validPass)
      const match = password === confirmPassword;
      setMatch(match)
   }, [password, confirmPassword])

   const handleRegister = async(e) => {
      e.preventDefault()
      setLoading(true)
      try{
         const name = USER_REGEX.test(username)
         const pass = PASSWORD_REGEX.test(password)
         if(name && pass){
            const response = await authUsers.post('/register', 
            {username, email, password})
            setSuccess(true)
            navigate('/login')
         }
         else setError('Inputs are not valid')
      } 
      catch(error){
         setSuccess(false)
         setLoading(false)
         !error.response && setError('No Server Response')
         error.response?.status === 403 && setError('Bad Credentials')
         error.response?.status === 400 && setError('Invalid Input')
      }finally{
         setSuccess(false)
         setLoading(false)
      }
   }

   const canSave = Object.values(register).every(Boolean)

   let successContent = ( 
      <div style={successStyle}>
         <p>
            Registration Successful!!
         </p>
      </div>     
   )

   let errorContent = ( 
      <div style={errorStyle}>
         <p>
            {error}
         </p>
      </div>     
   )

   let mainContent = (
      <div className="loginWrapper">
         <div className="loginLeft">
            <h3 className="loginLogo">Oluwatobby</h3>
            <span className="loginDesc">Connect with friends and the world around you on Oluwatobby</span>
         </div>
         <div className="loginRight">
            <form onSubmit={handleRegister} className="loginBox" onClick={() => setError(false)}>
               {!username ? '' : validUsername ? <FaCheck className='green'/> : <FaTimes className='red'/> }
               <input 
                  type="username" 
                  name="username"
                  required
                  autoComplete='off'
                  minLength={4}
                  placeholder='Username' 
                  className="loginInput" 
                  onChange={handleChange}   
               />
               {!validUsername && username &&
                  <p style={passStyle}>
                     <FaInfoCircle />
                     <span>
                        Username must begin with a letter, can have a lowercase or uppercase, a minimum of 5 and a maximum of 25 characters.
                     </span>
                  </p>
               }
               {!email ? '' : validUsername ? <FaCheck className='green'/> : <FaTimes className='red'/> }
               <input 
                  type="email" 
                  placeholder='Email'
                  name="email"
                  minLength={5} 
                  required
                  autoComplete='off'
                  className="loginInput" 
                  onChange={handleChange}   
               />
               {success && successContent}
               {error && errorContent}
               {!password ? '' : validUsername && validPassword ? <FaCheck className='green'/> : <FaTimes className='red'/> }
               <div className="pass">
                  <input 
                     type={show ? "text" : "password"} 
                     placeholder='Password' 
                     name="password"
                     required
                     autoComplete='off'
                     className="loginInput" 
                     onChange={handleChange}   
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
               {!validPassword && password && validUsername &&
                  <p style={passStyle}>
                     <FaInfoCircle />
                     <span>
                        must contain at least a letter, a number, a symbol, a minimum of 5 and maximum of 25 characters.
                     </span>
                  </p>
               }
               <div className="pass">
                  <input 
                     type={show ? "text" : "password"} 
                     placeholder='Confirm Password' 
                     name='confirmPassword' 
                     required
                     autoComplete='off'
                     className="loginInput" 
                     onChange={handleChange}   
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
               {validPassword && !match && confirmPassword &&
                  <p style={{backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center', fontSize: '14px', borderRadius: '5px', padding: '10px'}}>
                     <FaInfoCircle />
                     <span>
                        password must be a match.
                     </span>
                  </p>
               }
               {/* {!password &&
                  <p style={passStyle}>
                     <FaInfoCircle />
                     <span>
                        valid password input required first.
                     </span>
                  </p>
               } */}
                  <button type="submit" 
                     className={(!canSave || !match) ? 'none' : 'loginButton'} 
                     disabled={!canSave && match && validPassword && validUsername}
                     >Sign Up</button>
               
               <Link className='links' to='/login'>   
                  <button 
                     type='button' 
                     className="loginRegisterButton"
                     >Log into your Account
                  </button>
               </Link>
            </form>
         </div>
      </div>
   )

  return (
    <Container>
         {loading ? <p style={{textAlign:'center', fontSize:'18px'}}>Registering...</p> : mainContent}
    </Container>
  );
}

export default Register;

const Container = styled.div`
   width: 100%;
   height: 100vh;
   background-color: #f0f2f5;
   display: flex;
   align-items: center;
   justify-content: center;

   .green{
      color: green;
      font-size: 22px;
      padding: 0;
      margin: 0 0 -10px 0;
   }

   .red{
      color: red;
      font-size: 24px;
      margin: -10px 0;
   }

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
         padding: 10px;
         position: relative;

         .loginBox{
            // height: 450px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            box-shadow: -2px 4px 16px rgba(0,0,0,0.2);
            justify-content: space-between;

            .loginInput{
               min-height: 50px;
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

            p{
               span{
                  padding-left: 10px;
               }
            }

            .loginButton{
               min-height: 50px;
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

            .none{
               min-height: 50px;
               border-radius: 10px;
               border: none;
               background-color: lightgray;
               color: white;
               font-size: 20px;
               font-weight: 500;
               cursor: pointer;
               transition: all 0.25s ease-in-out;
            }

            .loginForgot{
               text-align: center;
               color: #1775ee;
            }

            .loginRegisterButton{
               height: 35px;
               width: 100%;
               align-self: center;
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
            }
         }

         @media (min-width: 768px){

            .loginBox{

               .loginInput{

               }
            }
         }
      }

      @media (max-width: 768px){
         flex-direction: column;
         gap: 0.8rem;
      }
   }

   @media (max-width: 768px){
      align-items: flex-start;
      padding-top: 2rem;
   }
`

const successStyle = {
   display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'cyan', borderRadius: '10px', padding: '20px', color: 'green', fontSize: '24px', right: '50px', top: '40px', zIndex: '5', position: 'absolute'
}

const errorStyle = {
   display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px', color: 'red', fontSize: '24px', right: '50px', top: '40px', zIndex: '5', position: 'absolute', whiteSpace: 'nowrap'
}

const passStyle = {
   width: '100%', margin: '-8px 0 -3px 0', padding: '2px 5px 2px 5px', backgroundColor: 'black', borderRadius: '10px', color: 'white', textTransform: 'lowercase', fontSize: '14px', display: 'flex', flexDirection: 'column', textAlign: 'left'
}

