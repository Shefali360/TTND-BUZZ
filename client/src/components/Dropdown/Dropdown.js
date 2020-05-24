import React from 'react';

const Dropdown=(props)=>{
    return(
          <option value={props.value} defaultValue>{props.optionName}</option>
          )
}
export default Dropdown;