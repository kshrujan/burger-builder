import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    //console.log(props);

    let transformedIngredients = Object.keys(props.burgerIngredients).map(ingredientKey => {
        return [...Array(props.burgerIngredients[ingredientKey])].map((_, i) => { //the _ inside means that we don't really care about the key, just the index
            return <Ingredient key={ingredientKey + i} type={ingredientKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []); //reduce can take a callback function as well as an intial value. In this case, we just send an initial value of a blank array that will be updated as we go along (this updated version is accessed via "arr"). Doing this allows us to simply check the length of the transformedIngredients to determine whether or not the user has just started building their burger



    //console.log(transformedIngredients);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please Select Ingredients for Your Burger</p>;
    }

    // let ingredientArragement = props.burgerIngredients.map((ingredientKey, i) => {
    //     return <Ingredient key={ingredientKey + i} type={ingredientKey} />
    // });

    // if(ingredientArragement.length === 0) {
    //     ingredientArragement = <p>Please Select Ingredients for Your Burger</p>;
    // }

    return(
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {transformedIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
}


export default withRouter(burger);