import deleteIcon from '../assets/delete.svg';
import './BurgerItem.css';

export default function BurgerItem({ item, setChosenObjects }) {

  function handleAdd() {
    setChosenObjects(prevArr => prevArr.map((obj) => {
      if (obj.name === item.name) {
        return { ...obj, quantity: obj.quantity + 1 };
      } else {
        return obj;
      }
    }))
  }

  function handleReduce() {
    setChosenObjects(prevArr => prevArr.map((obj) => {
      if (obj.name === item.name && obj.quantity > 0) {
        return { ...obj, quantity: obj.quantity - 1 };
      } else {
        return obj;
      }
    }))
  }

  function handleDelete() {
    setChosenObjects(prevArr => prevArr.filter(obj => obj.name !== item.name));
  }

  return (
    <div className="bgItem">
      <div>
        <img className='bgItemImage' src={item.url} alt={item.name} />
      </div>
      <div className='bgIt'>
        <div className='delBtnWrap'>
          <img onClick={handleDelete} className='delBtn' src={deleteIcon} alt="delete" />
        </div>
        <div className='bgItemInfo'>
          <div className='bg-i-n'>
            <div className='txt'>{item.name}</div>
            {item.sizes.join(', ')}
          </div>
          <div className='priceNum'>
            <b>
              {`${item.price} $`}
            </b>
          </div>
        </div>

        <div className='quantityWrap'>
          <div>Quantity: <b>{item.quantity}</b></div>
          <div className='btns'>
            <button className={item.quantity < 1 ? 'noActive' : 'active'} onClick={() => handleReduce()}>-</button>
            <button className='active' onClick={handleAdd}>+</button>
          </div>
        </div>

      </div>
    </div>
  )
}
