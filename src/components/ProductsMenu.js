import React from 'react';
import ProductsMenuHeader from './ProductsMenuHeader';
import ProductsSubMenu from './ProductsSubMenu';

export default class ProductsMenu extends React.Component {
  render() {
    let rearrangedData = this.props.productsData.reduce((prev, current) => {
      if (prev[current.category] == undefined) {
        prev[current.category] = [];
      }
      
      prev[current.category].push({
        price: current.price,
        stocked: current.stocked,
        name: current.name
      });

      return prev;
    }, {});

    let subMenus = Object.keys(rearrangedData)
      .map(key => ({
        category: key,
        items: rearrangedData[key]
      }))
      .map(obj => (<ProductsSubMenu key = {obj.category} category = {obj.category} 
                                items = {obj.items} />));

    return (
      <table className="products-menu">
        <ProductsMenuHeader />
        {subMenus}
      </table>
    )
  }
}