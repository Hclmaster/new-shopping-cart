import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import SimplePopover from "./SimplePopover";

firebase.initializeApp({
    apiKey: "AIzaSyBE3JoEW7IuegFTWuSBGxXVWZByjlBcGpE",
    authDomain: "shopcart-92557.firebaseapp.com"
})

class ShopCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleCartClick = (event) => {
        if (this.state.isOpen) {
            this.setState({isOpen: false})
        } else {
            this.setState({isOpen: true})
        }
    }

    _renderFloatingCart = () => {
        if (this.state.isOpen) {
            return <SimplePopover items={this.props.items} addCallback={this.props.addCallback}
                                  removeCallback={this.props.removeCallback}/>
        }
    }

    render() {
        return (
            <div>
                <img class="cart-button" src={require(`./static/baseline_shopping_cart_black_18dp.png`)}
                     onClick={() => this.handleCartClick()}>
                </img>
                <div class="cart-button">{this._renderFloatingCart()}</div>
            </div>
        )
    }
}

class AddToCartBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            num: 0
        }

    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.addCallback(this.props.info)}>Add to cart!</button>
            </div>
        )
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;

        return (
            <div className="shelf-item">
                <img src={this.props.src}/>
                <p className="shelf-item__title">{product.title}</p>
                <p className="shelf-item__price">${product.price}</p>
                <AddToCartBtn addCallback={this.props.addCallback} info={product}/>
            </div>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        const rows = [];

        this.props.products.forEach((product) => {
            rows.push(
                <ProductRow
                    product={product}
                    src={require(`./static/data/products/${product.sku}_1.jpg`)}
                    key={product.id}
                    addCallback={this.props.addCallback}
                />
            );
        });

        return (
            <div className="shelf-container">
                {rows}
            </div>
        )
    }
}


class App extends React.Component {

    state = {isSignedIn: false}
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            items: {}       // id + json object
        }
    }

    componentDidMount() {
        import('./products.json').then(
            json => {
                this.setState({products: json.products})
            });

        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn: !!user})
            console.log("user", user)
        })
    }

    addItem = (item) => {
        let newItemState = null
        if (this.state.items[item.id]) { // if item in cart
            newItemState = {...this.state.items}    // copy in jsx
            newItemState[item.id].quantity++
        } else { // if not
            const newItem = {...item}
            newItem.quantity = 1
            newItemState = {...this.state.items}
            newItemState[item.id] = newItem
        }
        this.setState({items: newItemState})
    }

    removeItem = (item) => {
        if (this.state.items[item.id]) { // if item in cart
            const newItemState = {...this.state.items}
            if (newItemState[item.id].quantity > 0) {
                newItemState[item.id].quantity--
            }
            this.setState({items: newItemState})
        }
    }

    render() {
        console.log("data ===> ", this.state.products[0]);

        // why state.data can be null???
        if (this.state.products) {
            return (
                <div className="App">
                    {this.state.isSignedIn ?
                        (
                            <span>
                            <div>Signed In!</div>
                            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                          </span>
                        )
                        :
                        (
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                        )
                    }
                    <ShopCart items={this.state.items} addCallback={this.addItem} removeCallback={this.removeItem}/>
                    <ProductTable products={this.state.products} addCallback={this.addItem}/>
                </div>
            );
        } else {
            return <h1>Loading...</h1>
        }
    }
}

export default App;
