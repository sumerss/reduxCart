import React from 'react';
import { useEffect, useState } from 'react';
import classes from './Notification.module.css';

const Notification = (props) => {
    let specialClasses = '';
    const [visible, setVisible] = useState(true);

    if (props.status === 'error') {
        specialClasses = classes.error;
    }
    if (props.status === 'success') {
        specialClasses = classes.success;
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 2000);
        return () => {
            clearTimeout(timer);
            setVisible(true);
        }
    }, [props.status]);

    return (
        <React.Fragment>
            {visible && <section className={cssClasses}>
                < h2 > {props.title}</h2 >
                <p>{props.message}</p>
            </section >}
        </React.Fragment>
    );
};

export default Notification;