import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './App.css';
import Score from './components/Score';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
`;

const List = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;

const ListItem = styled.li`
  width: 300px;
  display: flex;
  align-items: center;
  padding: 4px 0px;
  justify-content: space-between;
`;

const Image = styled.img`
  margin-left: 8px;
  margin-right: 4px;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

const ONE_SECOND = 100;

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://webcdn.17app.co/campaign/pretest/data.json')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
      );
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      setTimeout(() => {
        const newItems = [...items];
        const randomIndex = getRandomInt(items.length);
        newItems[randomIndex].score =
          newItems[randomIndex].score + getRandomInt(1000);
        setItems(newItems);
      }, ONE_SECOND);
    }
  }, [items]);

  const renderItems = () => {
    return items.map((item, index) => (
      <ListItem key={item.userID}>
        <CenteredDiv>
          {index + 1} <Image src={item.picture} />
          {item.displayName}
        </CenteredDiv>
        <Score name={item.displayName} time={ONE_SECOND}>
          {item.score}
        </Score>
      </ListItem>
    ));
  };

  return (
    <Container className='App'>
      <List type='1'>{items.length > 0 && renderItems()}</List>
    </Container>
  );
}

export default App;
