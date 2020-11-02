import React, { Component } from 'react';

//importando css
import css from './Countries.module.css';

export default class Country extends Component {
  render() {
    //desestruturando
    const { country } = this.props;
    const { name, flag } = country;

    return (  
      <div className={`${css.country} ${css.border}`}>
        <img className={css.flag} src={flag} alt={name}/>
        <span className={css.countryName}>{name}</span>
      </div>
    );
  }
}