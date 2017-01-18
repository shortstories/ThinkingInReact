import React from 'react';

export default class ProductsMenuHeader extends React.Component {
  render() {
    return (
      <thead className = 'products-menu-header'>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
    );
  }
}