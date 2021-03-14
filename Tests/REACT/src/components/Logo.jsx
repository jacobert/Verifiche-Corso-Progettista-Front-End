import React from 'react'
import logo from '../logo.svg';


// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'


const Logo = ({ loading }) => {
    return (
      <img
        src={logo}
        alt='interactive-logo'
        className={`App-logo${loading ? '-spinning' : ''}`} 
      />
    )
  }

export default Logo