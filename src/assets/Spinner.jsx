import React from 'react';
import gear from './Gear.svg'

const Spinner = () => {
  return (
    <div style={spinnerStyle}>
      <img src={gear} alt='loading...' style={{height: '80px', borderRadius: '50%'}} />
    </div>
  );
}

export default Spinner;

const spinnerStyle = {
  backgroundColor: 'transparent',
  marginTop: '0', 
  position: 'fixed', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  top: '0', 
  left: '0', 
  right: '0', 
  bottom: "0", 
  zIndex: '50', 
  minWidth: '100%', 
  minHeight: '100vh',
  opacity:'0.5'
}