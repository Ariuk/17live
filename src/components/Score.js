import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: inline-box;
  align-items: center;
`;

const DIVIDER = 24;

export default function Score({ children, name, time }) {
  const [number] = useState(children);
  const divRef = useRef(null);
  const count = useRef(null);

  useEffect(() => {
    const current = Number(divRef?.current?.innerText);
    if (current !== children && !count.current) {
      const diff = (children - current) / DIVIDER;
      count.current = DIVIDER;
      let inter = setInterval(() => {
        const changed = Number(divRef?.current?.innerText);
        divRef.current.innerText = Math.floor(changed + diff);
        count.current--;
        if (!count.current) {
          clearInterval(inter);
        }
      }, time / DIVIDER);
    }
  }, [children]);

  return (
    <Div>
      <div ref={divRef}>{Math.floor(number)}</div>pt
    </Div>
  );
}
