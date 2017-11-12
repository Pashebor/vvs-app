import React from 'react';

const Notification = props => {
    return(
        <div className={`popup-form__notification ${props.type}`}>
            <h3>{props.message}</h3>
        </div>
    )
};

export default Notification;