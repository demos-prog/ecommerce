import styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import './FilterButton.css';

export default function FilterButton({ marker, filterArr, setFilterArr, StartfilterArr }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick(marker) {
    if (filterArr.length === 6) {
      setFilterArr([marker]);
    } else if (filterArr.length === 1 && filterArr.includes(marker)) {
      setFilterArr(StartfilterArr);
    } else if (!filterArr.includes(marker)) {
      setFilterArr(prev => [...prev, marker]);
    } else if (filterArr.includes(marker)) {
      setFilterArr(prev => prev.filter(item => item !== marker));
    }
  }

  return (
    <ThemeProvider theme={{ isActive }}>
      <Button
        className="filterBtn"
        onClick={() => { handleClick(marker); setIsActive(prev => !prev) }}>
        {marker}
      </Button>
    </ThemeProvider>
  )
}


const Button = styled.button`
  border-radius: 50%;
  background-color: ${(props) =>
    props.theme.isActive === false ? "rgb(218, 218, 218)" : "black"};
  color : ${(props) =>
    props.theme.isActive === false ? "black" : "white"};
  width: 40px;
  height: 40px;
`
