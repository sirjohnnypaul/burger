import React, {Component} from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentWillUpdate () {
        console.log("Order summary will update")
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}:{this.props.ingredients[igKey]}</span></li>
            })

        return (
            <Aux>
            <h2>Your order</h2>
            <h2>Total price: {this.props.totalPrice.toFixed(2)}$</h2>
            <p>Ingredients summary:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> Continue to checkout!</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        )
    }

};

export default OrderSummary