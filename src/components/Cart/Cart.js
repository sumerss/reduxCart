import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../reduxStore/ui';
import { cartActions } from '../../reduxStore/cart';

const Cart = (props) => {

  const cartData = useSelector(state => state.cart.cartData);
  const dispatch = useDispatch();
  const cartLength = useSelector(state => state.cart.totalQuantitiy);

  // console.log(cartData)
  const deleteHandler = async () => {
    dispatch(uiActions.setNotification({
      status: 'pending',
      title: 'Pending',
      message: 'Deleting data...'
    }))

    const res = await fetch('https://react-http-b29cd-default-rtdb.firebaseio.com/cart.json', {
      method: 'DELETE'
    });

    // console.log(res);
    dispatch(uiActions.setNotification({
      status: 'success',
      title: 'Success',
      message: 'Deleted data'
    }))

    dispatch(cartActions.clearCart());

  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartData.map(data => {
          return <CartItem
            key={data.id}
            item={{ key: data.id, id: data.id, title: data.title, quantity: data.quantity, total: data.totalAmt, price: data.price }}
          />
        })}
      </ul>
      {cartLength > 0 &&
        <div className={classes.buttonLayout}>
          <button className={classes.button} onClick={deleteHandler}>Delete Cart</button>
          <button disabled='true'>Order Cart</button>
        </div>}
    </Card>
  );
};

export default Cart;
