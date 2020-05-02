import React from 'react';

import './Input.css';

/* 
    New place input function and style
    props.element: check if type is input, if yes, output input field, otherwise textarea.
    htmlFor: == for attributes
    rows: specify rows or default 3 rows.
 */
const Input = props => {
  const element =
    props.element === 'input' ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
