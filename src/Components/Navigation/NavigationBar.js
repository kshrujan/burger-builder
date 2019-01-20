import React from 'react';
import classes from './NavigationBar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const navigationBar = (props) => {
    return(
        <header className={classes.NavBar}>
            <div onClick={props.openSideNav} className={classes.DesktopOnlyToggle}>&#9776;</div>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className = {classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}


export default navigationBar;