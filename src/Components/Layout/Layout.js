import React, {Component} from 'react';
import Aux from '../../hoc/HOC';
import classes from './Layout.css';
import NavBar from '../Navigation/NavigationBar';
import SideNav from '../Navigation/SideNav/SideNav';

class Layout extends Component {
    state = {
        showSideNav: false
    };

    hideSideNav = () => {
        this.setState({showSideNav: false})
    }

    showSideNav = () => {
        this.setState({showSideNav: true});
    }

    render() {
        return(
            <Aux>
                <NavBar openSideNav = {this.showSideNav} />
                <SideNav open={this.state.showSideNav} hide={this.hideSideNav}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}


export default Layout;