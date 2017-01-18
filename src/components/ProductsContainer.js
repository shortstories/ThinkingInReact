import React from 'react';
import ProductSearchComponent from './ProductSearchComponent';
import ProductsMenu from './ProductsMenu';
import ProductsData from './ProductsData';


export default class ProductsContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText: '',
      showInStock: false,
      productsData: ProductsData
    }

    this.onUserInput = this.onUserInput.bind(this);
  }

  onUserInput(state) {
    this.setState(state);
  }

  dataFiltering(data) {
    return data.filter(product => {
      if (this.state.showInStock && this.state.showInStock != product.stocked) {
        return false;
      }

      return product.name.toLowerCase().includes(this.state.searchText.toLowerCase());
    })
  }

  render() {
    return (
      <div className="products-container">
        <ProductSearchComponent searchText={this.state.searchText} 
                                showInStock={this.state.showInStock} 
                                onUserInput={this.onUserInput} />
        <ProductsMenu productsData = {this.dataFiltering(this.state.productsData)} />
      </div>
    )
  }
}