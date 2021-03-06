import React from 'react';


const Input = ({propsInput, functionInput}) => {
  return(
    <form>
          <input
          type="search"
          id="search" name="search"
          value={propsInput}
          onChange={functionInput}
          placeholder='Scrivi qui'
          />
      </form>
  )
}

export default Input

