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

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
    width: 300px;
    display: flex;
    order: ${(props) => props.order}
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

const ONE_SECOND = 1000;

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://webcdn.17app.co/campaign/pretest/data.json')
      .then((res) => res.json())
      .then((result) => {
        setItems(result.sort((a, b) => b.score - a.score));
      });
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      setTimeout(() => {
        const newItems = [...items];
        const randomIndex = getRandomInt(items.length);
        const newItem = { ...newItems[randomIndex] };
        newItems.splice(randomIndex, 1);
        newItem.score = newItem.score + getRandomInt(10000);
        newItems.push(newItem);
        setItems(newItems.sort((a, b) => b.score - a.score));
      }, ONE_SECOND);
    }
  }, [items]);

  const renderItems = () => {
    return items.map((item, index) => (
      <ListItem order={index} key={item.userID}>
        <CenteredDiv>
          <div style={{ width: 20 }}>{index + 1} </div>
          <Image src={item.picture} />
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
      <List>{items.length > 0 && renderItems()}</List>
    </Container>
  );
}

export default App;
