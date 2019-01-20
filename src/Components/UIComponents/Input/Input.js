import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElm = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    //From React 16+, ...props sends down ALL props even if React isn't aware of that prop for that element. Therefore, sending inputType below would cause an error.A quick fix is to simply use "inputtype" instead. OR DO THE ONE BELOW
    // switch(props.inputtype) {
    //     case ("input"):
    //         inputElm = <input className={classes.InputElement} {...props} />;
    //         break;
    //     case("textarea"):
    //         inputElm = <textarea className={classes.InputElement}  {...props} />
    //         break;
    //     default:
    //         inputElm = <input className={classes.InputElement} {...props} />;
    // }

    switch(props.elementType) {
        case ("input"):
            inputElm = <input 
            className={inputClasses.join(' ')} {...props.elementConfig} 
            value={props.value} onChange={props.changed} />;
            break;
        case("textarea"):
            inputElm = <textarea 
            className={inputClasses.join(' ')}  {...props.elementConfig} 
            value={props.value} onChange={props.changed}/>
            break;
        case("select") :
            inputElm = (<select className={inputClasses.join(' ')}
            value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.valu}>{option.displayVal}</option>
                ))}
            </select>);
            break;
        default:
            inputElm = <input 
            className={inputClasses.join(' ')} {...props.elementConfig} 
            value={props.value} onChange={props.changed}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElm}
        </div>
    );
}


export default input;