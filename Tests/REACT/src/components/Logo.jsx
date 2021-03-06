import React from 'react';

const Logo = ({ propsLoading, propsLogo }) => {
    return (
      <img
        src={propsLogo}
        alt='interactive-logo'
        className={propsLoading ? 'App-logo-spinning' : 'App-logo'}
      />
    )
  }

export default Logo
