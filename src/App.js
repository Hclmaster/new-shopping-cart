import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ProductCategoryRow extends React.Component{
    render(){
        const category = this.props.category;
        return(
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        )
    }
}

class ProductRow extends React.Component{
    render(){
        const product = this.props.product;
        const name = product.stocked ? product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>;

        return(
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }
}

class ProductTable extends React.Component {
    render(){
        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            if(product.category !== lastCategory){
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                )
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        )
    }
}

class ClothPic extends Component{

}

class ClothName extends Component{

}

class ClothPrice extends Component{

}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class FilterableProductTable extends Component{
    render(){
        return (
            <div>
                <ProductTable products={this.props.products} />
            </div>
        )
    }
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : null
    };
  }

  componentDidMount() {
      import('./products.json').then(
          json => {
              this.setState({data: json.products})
          });
  }

  render(){
      if(this.state.data){
          console.log("data => ", this.state.data);
      }
      return (
          <FilterableProductTable products={PRODUCTS}/>
      );
  }
}

export default App;