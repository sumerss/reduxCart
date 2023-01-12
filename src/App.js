import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notifications';

import { uiActions } from './reduxStore/ui';

let initialPageLoad = true;

function App() {

  const cart = useSelector(state => state.cart);
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
      const res = await fetch('https://react-http-b29cd-default-rtdb.firebaseio.com/cart.jsn', {
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

    if (initialPageLoad) {
      initialPageLoad = false;
      return;
    }

    sendReq(cart).catch((error) => {
      dispatch(uiActions.setNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending data failed!'
      }))
    })

  }, [cart, dispatch])

  return (
    <Fragment>
      {notification.status &&
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />}
      <Layout>
        {cart.showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
