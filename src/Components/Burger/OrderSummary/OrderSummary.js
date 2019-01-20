import React, {Component} from 'react';
import Aux from '../../../hoc/HOC';
import Button from '../../UIComponents/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log("[OrderSummary] will update");
    }
        
    render() {

        const orderDetails = Object.keys(this.props.ingredients)
        .map((key, i) => {
            if(this.props.ingredients[key] > 0) {
               return <tr key={key}>
                        <td style={{padding: '10px'}} key={key + i}>
                            <i><span style={{textTransform: 'capitalize'}}>{key}</span></i>
                        </td>
                        <td>
                            <i>x{this.props.ingredients[key]}</i>
                        </td>
                      </tr> 
            } else {
                return null;
            }
        });
        
        return(
            <Aux>
                <h3 style={{textAlign: "center", textDecoration: "underline"}}>Your Order</h3>
                <table style={{width: '100%', borderBottom: '1px solid black'}}>
                    <thead>
                        <tr style={{textAlign: 'left'}}>
                            <th colSpan={1} style={{borderBottom: '1px dotted black'}}>Ingredients: </th>
                            <th style={{borderBottom: '1px dotted black'}}>Amount: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails}
                    </tbody>
                </table>
                <div style={{textAlign: 'center', padding: '10px', borderTop: '1px solid black', borderBottom: '1px solid black', width: '50%', marginTop:'10px', alignContent: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
                    <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
                    <Button btnType="Success" clicked={this.props.buy}>Checkout</Button>
                </div>
            </Aux>
        );
    }

}

export default OrderSummary;