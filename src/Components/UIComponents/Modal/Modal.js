import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/HOC';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[Modal] should component update");
        // console.log("Next: "+ nextProps.show);
        // console.log("This: "+ this.props.show);
            //the below will still cause a re-render because the next props.show, when clicking checkout, will be false as we update the state in BurgerBuilder in the checkout function. We could also add "nextProps.children !== this.props.children" to be more thorough
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log("[Modal] will update");
    }

    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} close={this.props.close} />
                <div className={classes.Modal} style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}


export default Modal;

