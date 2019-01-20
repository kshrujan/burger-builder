import React, {Component} from 'react';


import Aux from '../../hoc/HOC';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UIComponents/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axiosOrders from '../../axios-orders';
import Loading from '../../Components/UIComponents/Loading/Loading';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


//const global vars are generally in all caps
const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 0.5,
    cheese: 0.5,
    meat: 1.5
};

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 5,
        checkoutReady: false,
        inCart: false,
        loading: false,
        error: null
        // ingredients: []
    };

    componentDidMount() {
        axiosOrders.get("https://burger-builder-ceefa.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error => {
                this.setState({error: error});
            });
    }

    setCheckoutReady = (ingredients) => {
        //the udpated ingredients are passed in {salad: 0...}

        //1) transform the ingredients into a single value
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]; //at this point we are taking the ingredients {salad: 0..} => [0,0,1,0]
            }).reduce((sum, element) => {
                return sum + element; //at this point, we are reducing the value down into a single vaue [0,0,1,0] => 1
            },0);

        //2) set the checkoutReady stte
        this.setState({checkoutReady: sum > 0});
    }

    addIngredients = (ingredientType) => {
        //get the current ingredients and price state
        let updatedIngredients = {...this.state.ingredients};
        let currentPrice = this.state.totalPrice;
        
        //update the value of at the specific ingredientType and the price
        updatedIngredients[ingredientType]++;
        let updatedPrice = currentPrice + INGREDIENT_PRICES[ingredientType];

        //set the updated state
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });

        //udpate the checkoutReady State
        this.setCheckoutReady(updatedIngredients);
    }

    removeIngredient = (ingredientType) => {
        //get the current ingredients and price state
        let updatedIngredients = {...this.state.ingredients};
        let currentPrice = this.state.totalPrice;

        //update the values
        updatedIngredients[ingredientType]--;
        let updatedPrice = currentPrice - INGREDIENT_PRICES[ingredientType];

        //set the new values
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });

        //udpate the checkoutReady State
        this.setCheckoutReady(updatedIngredients);
    }

    showCart = () => {
        this.setState({
            inCart: true
        })
    }

    closeCart = () => {
        this.setState({
            inCart: false
        });
    }

    checkoutCart = () => {
        //1) lets send the current ingredients down to checkout page
        let ingredientsArr = [];
        for(let i in this.state.ingredients) {
            if(this.state.ingredients[i] > 0) {
                ingredientsArr.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
            }
        }
        ingredientsArr.push("price=" + this.state.totalPrice);
        let queryString = "?" + ingredientsArr.join("&");
        console.log(queryString);
        this.props.history.push({
            pathname: "/checkout",
            search: queryString
        });
    }
    
    render() {

        const shouldDisable = {...this.state.ingredients};

        for(let ingredient in shouldDisable) {
            shouldDisable[ingredient] = shouldDisable[ingredient] <= 0;
        }//basically on every render, we are deciding what less buttons to disable. {salad: True, bacon: false ....}

        let orderSummary = null;
        let burger = this.state.error ? <p>Unable to get ingredient list</p> : <Loading />;

        if(this.state.ingredients) { //i.e if the ingredients are set
            burger = 
            <Aux>
                <Burger burgerIngredients = {this.state.ingredients} />
                <BuildControls 
                add={this.addIngredients} 
                remove={this.removeIngredient} 
                disabled={shouldDisable}
                checkoutReady = {this.state.checkoutReady}
                inCart = {this.showCart}
                price={this.state.totalPrice}/>
            </Aux>
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            cancel={this.closeCart}
            buy={this.checkoutCart}
            price={this.state.totalPrice}/>;
        }

        if(this.state.loading) {
            orderSummary = <Loading />
        }

        return(
            <Aux>
                <Modal show={this.state.inCart} close = {this.closeCart}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosOrders);