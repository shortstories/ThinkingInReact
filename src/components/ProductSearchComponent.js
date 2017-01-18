import React from 'react';

export default class ProductSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeInputs = this.onChangeInputs.bind(this);
  }

  onChangeInputs(e) {
    console.info(e);
    this.props.onUserInput({
      searchText: this.inputSearchText.value,
      showInStock: this.inputShowInStock.checked
    });
  }

  render() {
    return (
      <div className="product-search-component">
        <div>
          <input id='input_search_text' type="text" value={this.props.searchText} 
                  ref={input => this.inputSearchText = input} onChange={this.onChangeInputs} />
        </div>
        <div>
          <input id='input_show_in_stock' type="checkbox" checked={this.props.showInStock} 
                  ref={input => this.inputShowInStock = input} onChange={this.onChangeInputs} />
          <label htmlFor='input_show_in_stock'>Only show products in stock</label>
        </div>
      </div>
    )
  }
}