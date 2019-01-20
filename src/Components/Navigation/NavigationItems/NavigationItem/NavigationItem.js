import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => {
    return(
        <li className={classes.NavigationItem}>
            <NavLink exact
            to={props.link} //remember, the "to" prop is used as a prefix, so we have to make sure to use exact
            activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;