import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/Validators';
import './NewPlace.css';

/* 
    New place info display area
 */

 // input container
 // add validator: required.
const NewPlace = () => {
    return (
      <form className="place-form">
        <Input 
          element="input" 
          type="text" 
          label="Title" 
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a valid title."
        />
      </form>
    );
  };
  
  export default NewPlace;
  