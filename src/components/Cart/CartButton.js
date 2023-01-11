import classes from './CartButton.module.css';
import { cartActions } from '../../reduxStore/cart';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cartData);

  const cartSize = cartData.length;

  const cartClickHandler = () => {
    dispatch(cartActions.showCart())
  };

  return (
    <button className={classes.button} onClick={cartClickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartSize}</span>
    </button>
  );
};

export default CartButton;
