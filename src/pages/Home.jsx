import React from 'react';
import Feed from '../components/Feed/Feed';
import Rightbar from '../components/Rightbar';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <div className="homeContainer">
         <Sidebar />
         <Feed />
         <Rightbar />
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`

   .homeContainer{
      display: flex;
      //align-items: center;
      width: 100%:
   }
`