import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './App.scss'

class ProductRow extends React.Component{
    render(){
        const product = this.props.product;

        return(
            <tr>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td><img src={this.props.src} /></td>
            </tr>
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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
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