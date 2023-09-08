import { useState, Suspense } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { mockData } from './mock';
import './null_styles.css';
import cart from './assets/shopping-cart.svg';
import loadImg from "./assets/Spin-1s-200px.svg";
import FilterButton from './components/FilterButton';
import Card from './components/Card';
import BurgerItem from './components/BurgerItem';
import './App.css';

const StartfilterArr = ["XS", "S", "M", "ML", "L", "XL"];

function App() {
  const [filterArr, setFilterArr] = useState(StartfilterArr);
  const [chosenObjects, setChosenObjects] = useState([]);

  const quantity = chosenObjects.reduce((prev, cur) => prev + cur.quantity, 0);
  const totalPrice = chosenObjects.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);

  const filteredData = mockData.filter((item) => {
    return item.sizes.some((size) => filterArr.includes(size));
  });

  const Loader = (
    <div className="loaderWrap">
      <img src={loadImg} alt="Loading..." />
    </div>
  );

  function handleOrder() {
    alert(`You've ordered ${quantity} item(s) in total price ${totalPrice} $ !`)
  }

  return (
    <>
      <header>
        <div id="counter"><b>{quantity}</b></div>
        <Menu customBurgerIcon={<img src={cart} alt="cart" />} right >
          <div>
            <div id="cartLogoWrap">
              <img id="cartLogo" src={cart} alt="cart" /> Cart
            </div>
            <div id="menuCounter">
              <b>{quantity}</b>
            </div>
          </div>
          <div>
            <pre><b>{`Total price: \t${totalPrice} $`}</b></pre>
          </div>
          <br />
          {chosenObjects.length === 0 ? <div>Please, chose something :)</div> :
            chosenObjects.map((item, i) => {
              return <BurgerItem
                setChosenObjects={setChosenObjects}
                item={item}
                key={i}
              />
            })}
          {chosenObjects.length > 0 && <button id="orderBtn" onClick={handleOrder}><b>Make the order</b></button>}
        </Menu>
      </header>
      <main>
        <div>
          <b>Sizes:</b>
          <div id="filterField">
            {StartfilterArr.map((item, i) => {
              return <FilterButton
                StartfilterArr={StartfilterArr}
                filterArr={filterArr}
                setFilterArr={setFilterArr}
                marker={item}
                key={i}
              />
            })}
          </div>
        </div>
        <div id="cont">
          <b>{filteredData.length === 1 ? "1 product found" : `${filteredData.length} products found`}</b>
          <div id="contentWrap">
            <Suspense fallback={Loader}>
              {filteredData.map((item, i) => {
                return <Card
                  chosenObjects={chosenObjects}
                  item={item}
                  setChosenObjects={setChosenObjects}
                  key={i}
                />
              })}
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
