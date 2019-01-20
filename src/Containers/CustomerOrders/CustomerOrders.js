import React, {Component} from 'react';
import axiosOrders from '../../axios-orders';
import Order from '../../Components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {Link} from 'react-router-dom';

class CustomerOrders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axiosOrders.get("/orders.json")
            .then(response => {
                let fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key});
                }
                this.setState({loading: false, orders: fetchedOrders});
            }).catch(err => {
                this.setState({loading: false});
            })
    }

    render() {
        let orders = <p>No orders yet. <Link to="/">Click here</Link> to Build your Burger!</p>

        if(this.state.orders.length > 0) {
            orders = this.state.orders.map((order, id) => {
                return <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
            });
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}


export default withErrorHandler(CustomerOrders, axiosOrders);