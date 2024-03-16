import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeDiv>
      <h2>
        Don't you have a todo yet ? Click on the ' Create new todo ' button and
        create your todo
      </h2>
      <img src="/paper.png" />
    </HomeDiv>
  );
};

export default Home;

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  h2 {
    position: absolute;
    width: 50%;
    text-align: center;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
