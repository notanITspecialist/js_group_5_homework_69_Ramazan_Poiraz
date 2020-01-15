import React from 'react';
import './ModalForm.css'

const ModalForm = props => {
    return (
        <div className="Modal" style={{
            opacity: props.show ?'1':'0',
            transform: props.show ? 'translateY(0vw)' : 'translateY(-100vw)'
        }}>
            <span className="ModaTitle">Send an order <button className='ModalButton ModalButtonClose' onClick={props.close}>Close</button> </span>
                <div>{props.children}</div>
        </div>
    );
};

export default ModalForm;