import React from 'react';

export default class ProductItem extends React.Component {
  render() {
    let name;

    if (this.props.stocked) {
      name = this.props.name;
    } else {
      name = (<span style= {{color: 'red'}}>{this.props.name}</span>);
    }

    return (
      <tr className = 'product-item'>
        <td>{name}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }
}