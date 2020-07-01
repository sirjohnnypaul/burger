import React from 'react'

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}:{props.ingredients[igKey]}</span></li>
        })
    
    return (
        <Aux>
            <h2>Your order</h2>
            <h2>Total price: {props.totalPrice.toFixed(2)}$</h2>
            <p>Ingredients summary:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> Continue to checkout!</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )

};

export default orderSummary