import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './App.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Container = styled.ol`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenteredDiv = styled.div`
display: flex;
align-items: center;
`

const List = styled.ul`
  width: 60%;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 4px;
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
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  console.log('items :>> ', items);

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length > 0) {
        const newItems = [...items];
        const randomIndex=getRandomInt(items.length);
        newItems[randomIndex].score =newItems[randomIndex].score + getRandomInt(1000);
        setItems(newItems);
      }
    }, ONE_SECOND);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetch('https://webcdn.17app.co/campaign/pretest/data.json')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <Container className='App'>
      <List type='1'>
        {items.map((item, index) => (
          <ListItem key={item.userID}>
            <CenteredDiv>
            {index + 1} <Image src={item.picture} />
            {item.displayName}
            </CenteredDiv>
          <div>
            {item.score}pt
          </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
