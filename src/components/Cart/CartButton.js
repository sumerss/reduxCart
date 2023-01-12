import classes from './CartButton.module.css';
import { cartActions } from '../../reduxStore/cart';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartData = useSelector(state => state.totalQuantitiy);


  const cartClickHandler = () => {
    dispatch(cartActions.showCart())
  };

  return (
    <button className={classes.button} onClick={cartClickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartData}</span>
    </button>
  );
};

export default CartButton;
