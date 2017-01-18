import React from "react";

export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h2>Header</h2>
        </header>
        <div className="content">{this.props.children}</div>
        <footer>
          <h2>Footer</h2>
        </footer>
      </div>
    )
  }
}