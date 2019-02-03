import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: {}, // object of key value pairs id: info + quantity
            products: []
        }
    }

    componentDidMount() {
        import("./static/data/products.json") // mocking api call
            .then((json) => {
                this.setState({products: json.products})
            })
    }

    addItem = (item) => {
        let newItemState = null
        if (this.state.items[item.id]) { // if item in cart
            newItemState = {...this.state.items}
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
        return (
            <div className="App">
                <Cart items={this.state.items} addCallback={this.addItem} removeCallback={this.removeItem}/>
                {this.state.products.map(pjson => <Product info={pjson} addCallback={this.addItem}/>)}
            </div>
        );
    }
}




class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    _handleCartClick = (e) => {
        if (this.state.isOpen) {
            this.setState({isOpen: false})
        } else {
            this.setState({isOpen: true})
        }
    }

    _renderFloatingCart = () => {
        if (this.state.isOpen) {
            return <CartDisplay items={this.props.items} addCallback={this.props.addCallback} removeCallback={this.props.removeCallback} />
        }
    }

    render() {
        return (
            <div>
                <button onClick={e => this._handleCartClick(e)}>CART</button>
                {this._renderFloatingCart()}
            </div>
        )
    }
}





const CartDisplay = (props) => {
    return (
        <div>
            {
                Object.keys(props.items)
                    .map(id => {
                        if (props.items[id].quantity > 0) {
                            return <CartItem info={props.items[id]} addCallback={props.addCallback} removeCallback={props.removeCallback}/>
                        }
                    })
            }
            <hr></hr>
        </div>
    )
}


const Product = (props) => {
    return (
        <div>
            <hr />
            <img src={require(`./static/products/${props.info.sku}_1.jpg`)} alt="" />
            <div>{props.info.title}</div>
            <div>{props.info.price}</div>
            <div>{`Sizes: ${props.info.availableSizes.join(", ")}`}</div>
            <div>{`or ${props.info.installments} x ${(props.info.price / props.info.installments).toFixed(2)}`}</div>
            <button onClick={() => props.addCallback(props.info)} >Add to cart</button>
            <hr />
        </div>
    )
}


const CartItem = (props) => {
    return (
        <div>
            <img src={require(`./static/products/${props.info.sku}_2.jpg`)} alt="" />
            <div>{props.info.title}</div>
            <div>{`${props.info.price} x ${props.info.quantity} = ${props.info.price*props.info.quantity}`}</div>
            <span>
        <button onClick={() => props.addCallback(props.info)}>Add</button>
        <button onClick={() => props.removeCallback(props.info)}>Remove</button>
      </span>
        </div>
    )
}

export default App;