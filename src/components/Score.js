import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: inline-box;
`;

const DIVIDER = 24;

let count = 0;
export default function Score({ children, name, time }) {
  const [number] = useState(children);
  const divRef = useRef(null);

  useEffect(() => {
    const current = Number(divRef?.current?.innerText);
    if (current !== children && !count) {
      const diff = (children - current) / DIVIDER;
      count = DIVIDER;
      let inter = setInterval(() => {
        const changed = Number(divRef?.current?.innerText);
        divRef.current.innerText = Math.floor(changed + diff);
        count--;
        if (!count) {
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
