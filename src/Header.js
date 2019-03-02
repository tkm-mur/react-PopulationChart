import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render () {
    return (
      <header className="header">
        <h1 className="header__title">都道府県別の総人口推移グラフ</h1>
      </header>
    )
  }
}

export default Header;
