import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notifications';

import { cartActions } from './reduxStore/cart';
import { uiActions } from './reduxStore/ui';

let afterFirstGet = true, firstGet = true;

function App() {

  const cart = useSelector(state => state.cart);
  const ui = useSelector(state => state.ui);
  const notification = useSelector(state => state.ui.notifications);
  // console.log(notification)
  const dispatch = useDispatch();

  useEffect(() => {

    const sendReq = async (data) => {

      dispatch(uiActions.setNotification({
        status: 'pending',
        title: 'Pending',
        message: 'Sending data...'
      }))
      const res = await fetch('https://react-http-b29cd-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Sending Data Failed!');
      }
      dispatch(uiActions.setNotification({
        status: 'success',
        title: 'Success',
        message: 'Data sent successfully'
      }))
    }
    // if loaded first time
    if (firstGet) {
      // console.log('return 1');
      return;
    }
    // if loaded after firstFetch
    if (afterFirstGet) {
      // console.log('return 2');
      afterFirstGet = false;
      return;
    }

    sendReq(cart).catch((error) => {
      dispatch(uiActions.setNotification({
        status: 'error',
        title: 'Error',
        message: error.message
      }))
    })
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(uiActions.setNotification({
      status: 'pending',
      title: 'Pending',
      message: 'Fetching data...'
    }))
    const fetchData = async () => {

      const res = await fetch('https://react-http-b29cd-default-rtdb.firebaseio.com/cart.json');

      if (!res.ok) {
        throw new Error('Error while fetching');
      }

      const resData = await res.json();
      // console.log(resData)
      if (resData === null || resData.cartData === undefined) {
        dispatch(uiActions.setNotification({
          status: 'success',
          title: 'Success',
          message: 'No data available!'
        }));
        firstGet = false;
        afterFirstGet = false;
        return;
      }

      dispatch(cartActions.createCart(resData))

      dispatch(uiActions.setNotification({
        status: 'success',
        title: 'Success',
        message: 'Fetched data successfully!'
      }));

    };

    fetchData().catch(error => {
      dispatch(uiActions.setNotification({
        status: 'error',
        title: 'Error',
        message: error.message
      }));
    });
    firstGet = false;
    // afterFirstGet = true;
  }, [])

  return (
    <Fragment>
      {notification.status &&
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />}
      <Layout>
        {ui.showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
