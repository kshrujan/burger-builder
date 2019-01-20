import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideNav.css';
import Backdrop from '../../UIComponents/Backdrop/Backdrop';
import Aux from '../../../hoc/HOC';

const sideNav = (props) => {
    //dynamically add the classes to the sideNav
    let addedClasses = [classes.SideNav, classes.Close];

    if(props.open) {
        addedClasses = [classes.SideNav, classes.Open];
    }

    return(
        <Aux>
            <Backdrop show={props.open} close={props.hide}/>
            <div className={addedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}


export default sideNav;