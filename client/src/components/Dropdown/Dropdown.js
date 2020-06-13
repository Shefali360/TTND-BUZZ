import React from 'react';
import Aux from '../../hoc/wrap/wrap';

const Dropdown=(props)=>{
    let options=null;
    options= (props.array).map((arr)=>{
   return <option key={arr.name} value={arr.value}>{arr.name}</option>
        })
    return(
        <Aux>
<select
    className={props.class}
    name={props.name}
    value={props.value}
    onChange={props.change}
  >
      {options}
  </select>
  </Aux>
    )
}

export default Dropdown;