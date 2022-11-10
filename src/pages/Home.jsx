import {useState} from 'react';
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
      width: 100%;

      @media (max-width: 908px){
        position: relative;
        justify-content: center;
        overflow-x: hidden;
      }
    }

`