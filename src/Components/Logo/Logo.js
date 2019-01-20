import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = () => {
    return(
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="Shru's Burgers"/> Shru's Burgers
        </div>
    );
}


export default logo;