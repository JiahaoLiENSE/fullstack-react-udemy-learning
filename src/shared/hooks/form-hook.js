import { useCallback, useReducer } from 'react';

/* 
    custom form hooks re-use template
    The Complete Guide" course or in the official docs: https://reactjs.org/docs/hooks-intro.html
    you can build your own React hooks (https://reactjs.org/docs/hooks-custom.html).
 */

 /*
    input container
    add validator: required.
    check all form title with id, if current id is same, check validation; if not the samw, change into same id then check.
 */
const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          // if input is undefined, continue can ingnore this step but go to next iteration
          if (!state.inputs[inputId]) {
            continue;
          }
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
        case 'SET_DATA':
          return {
            inputs: action.inputs,
            isValid: action.formIsValid
          }
      default:
        return state;
    }
  };

// export re-use useForm hook and can be applied to update and new place.
export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    /* useCallback: useCallback will return a memoized version of the callback that only changes 
                  if one of the dependencies has changed. This is useful when passing callbacks to 
                  optimized child components that rely on reference equality to prevent unnecessary renders 
                  (e.g. shouldComponentUpdate).
        variables: input value, isValue, id.
        make dynamic id content.
    */
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);
    
    // none dependencies, not re-created function when call back.
    const setFormData = useCallback((inputData, formValidity) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity
      });
    }, []);

    return [formState, inputHandler, setFormData];
};