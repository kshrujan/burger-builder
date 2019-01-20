import React, {Component} from 'react';
import classes from './Ingredient.css';
import PropTypes from 'prop-types';

class Ingredient extends Component  {


    render() {
        let chosenIngredient = null;

        switch(this.props.type) {
            case('bread-bottom'):
                chosenIngredient = <div className={classes.BreadBottom}></div>;
                break;
            case('bread-top'):
                chosenIngredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case('meat'):
                chosenIngredient = <div className={classes.Meat}></div>;
                break;
            case('cheese'):
                chosenIngredient = <div className={classes.Cheese}></div>;
                break;
            case('salad'):
                chosenIngredient = <div className={classes.Salad}></div>;
                break;
            case('bacon'):
                chosenIngredient = <div className={classes.Bacon}></div>;
                break;
            default:
                chosenIngredient = null;
        }

        return chosenIngredient;
    }
}

Ingredient.propType = {
    type: PropTypes.string.isRequired
};

export default Ingredient;