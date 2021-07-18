import React from 'react';

import './Square.css'

const Square = (props) => {
    return (
        <div className="square-wrap">
            <button className="square" onClick={props.onClick}>{props.value}</button>
        </div>
    );
}

export default Square;
