import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
} from '../../shared/util/Validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Auth.css';

// hooks
const Auth = () => {
  const [isLoignMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  // 
  const switchToModeHandler = event => {
    // if not in login mode, if input is empty, skip the error;
    // if input is filled, drops the input from sign up page when switch to login mode
    if (!isLoignMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        }, 
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );  
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className="authentication">
      <h2>{isLoignMode ? 'Login Required' : 'Sign Up'}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoignMode && (
        <Input 
            element="input" 
            id="name" 
            type="text" 
            label="Your Name" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText = "Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoignMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
  <Button inverse onClick={switchToModeHandler}>SWITCH TO {isLoignMode ? 'SIGNUP' : 'LOGIN'}</Button>
      </form>
    </Card>
  );
};

export default Auth;
