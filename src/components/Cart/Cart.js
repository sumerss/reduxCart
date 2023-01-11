import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

const Cart = (props) => {

  const cartData = useSelector(state => state.cartData);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartData.map(data => {
          return <CartItem
            item={{ title: data.title, quantity: data.quantity, total: data.total, price: data.price }}
          />
        })}
      </ul>
    </Card>
  );
};

export default Cart;
