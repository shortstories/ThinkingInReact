import React from 'react';
import ProductItem from './ProductItem';

export default class ProductsSubMenu extends React.Component {
  render() {
    const items = this.props.items.map(n => 
      (<ProductItem price = {n.price} stocked = {n.stocked} key = {n.name} name = {n.name} />));

    return (
      <tbody className = 'products-sub-menu'>
        <tr>
          <td colSpan="2"><span style={{fontWeight : 'bold'}}>{this.props.category}</span></td>
        </tr>
        {items}
      </tbody>
    );
  }
}