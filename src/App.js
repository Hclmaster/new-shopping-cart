import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './App.scss'

class ProductRow extends React.Component{
    render(){
        const product = this.props.product;

        return(
            <div className="shelf-item">
                <img src={this.props.src} />
                <p className="shelf-item__title">{product.title}</p>
                <p className="shelf-item__price">{product.price}</p>
                <button>Add to cart!</button>
            </div>
        )
    }
}

class ProductTable extends React.Component {
    render(){
        const rows = [];

        this.props.products.forEach((product) => {
            rows.push(
                <ProductRow
                    product={product}
                    src={require(`./static/data/products/${product.sku}_1.jpg`)}
                    key={product.id}
                />
            );
        });

        return(
            <div className="shelf-container">
                {rows}
            </div>
        )
    }
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : null
    }
  }

  componentDidMount() {
      import('./products.json').then(
          json => {
              this.setState({data: json.products})
          });
  }

  render(){
      // why state.data can be null???
      if(this.state.data){
          console.log("data => ", this.state.data);
          return (
              <ProductTable products={this.state.data}/>
          );
      }else{
          return <h1>Loading...</h1>
      }
  }
}

export default App;