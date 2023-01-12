import classes from './CartButton.module.css';
import { uiActions } from '../../reduxStore/ui';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart.totalQuantitiy);


  const cartClickHandler = () => {
    dispatch(uiActions.showCart());
    dispatch(uiActions.setNotification({
      status: '',
      title: '',
      message: ''
    }))
  };

  return (
    <button className={classes.button} onClick={cartClickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartData}</span>
    </button>
  );
};

export default CartButton;
