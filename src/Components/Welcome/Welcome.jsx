import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
// Welcome components  
export default function Welcome() {
  return (
    <div className="welcome-wrapper">
        <h1 className='top'>Great!</h1>
        <h2 className='middle'>Thanks for choosing us.</h2>
        <h2 className='bottom'>Have a nice day</h2>
        <Link to='/' id='home-btn'>Go To HomePage</Link>
    </div>
  );
}
