import React, { useReducer } from 'react';

import { validate } from '../../util/Validators';
import './Input.css';

/* 
  New place input function and style
 */

 // action.type: get type of action currently.
 // ...state: get copy of old state.
 // handle two case: when user input text, when user touch the input field. 
 // default: current state.
 // add validator: empty or not.
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      }
    default:
      return state;
  }
};

/* useReducer: An alternative to useState. accepts a reducer of type (state, action) => newState,
                and returns the current state paired with a dispatch method; use in complex
                state logic.
                syntax: const [state, dispatch] = useReducer(reducer, initialArg, init);
 */               
const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false
  });

  // Two attributes for handler.
  // event.target.value: get user input value.
  const changeHandler = event => {
    dispatch({ 
      type: 'CHANGE', 
      val: event.target.value, 
      validators: props.validators});
  };

  const touchHandler = event => {
    dispatch({
      type: 'TOUCH'
    });
  }
  // props.element: check if type is input, if yes, output input field, otherwise textarea.
  // htmlFor: == for attributes.
  // rows: specify rows or default 3 rows.
  // Input change listener.
  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  // !inputState.isValid: check if input value valid, if not, output error text
  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
