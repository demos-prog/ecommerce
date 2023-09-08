import { Suspense } from 'react';
import loadImg from "../assets/Spin-1s-200px.svg";
import './Card.css'

export default function Card({ chosenObjects, setChosenObjects, item }) {

  const isDuplicate = chosenObjects.some(obj => obj.name === item.name);

  function handleAdd() {
    if (!isDuplicate) {
      setChosenObjects(prev => [...prev, item]);
    }
  }

  return (
    <div className='cardWrap'>
      <Suspense fallback={<img src={loadImg} alt="Loading..." />}>
        <img src={item.url} alt={item.name} />
      </Suspense>
      <p>{item.name}</p>
      <pre>{`$ ${item.price}`}</pre>
      {isDuplicate ?
        <button className='deleteBtn'>Added</button>
        :
        <button className='cardBtn' onClick={handleAdd}>Add to cart</button>
      }
    </div>
  )
}
