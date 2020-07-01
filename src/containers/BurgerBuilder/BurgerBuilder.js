import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseAllowed: false,
        purchase: false
    }

    purchaseHandler = () => {
        this.setState({purchase: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchase: false})
    }

    purchaseContinueHandler = () => {
        alert("You continue")
    }

    updatePurchaseState (ingredients) {
        const summary = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((summary, el) => {
                return summary + el;
            },0);

        this.setState({purchaseAllowed: summary >0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return (
            <Aux>
                <Modal show={this.state.purchase} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} ingredients ={this.state.ingredients} totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabled={disabledInfo} price={this.state.totalPrice} purchaseAllowed={this.state.purchaseAllowed} ordered={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;