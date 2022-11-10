import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MissingPage = () => {
   const navigate = useNavigate()

  return (
    <Container>
      <div className="container">
         <h1>Page not found</h1>
         <p onClick={() => navigate(-1)}>Return to previous page</p>
      </div>
    </Container>
  );
}

export default MissingPage;

const Container = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   justify-content: center;

   .container{
      margin-top: 7rem;
      display: flex;
      flex-direction: column;
      gap:3rem;
      align-items: center;

      h1{
         font-size: 48px;
      }

      p{
         font-size: 24px;
         color: rgba(0,0,0,0.7);
         cursor: pointer;
         border-bottom: 3px solid lightgray;
         transition: all 0.2 ease-in;

         &:hover{
            color: rgba(0,0,0,0.9);
            background-color: lightgray;
         }
      }
   }
`