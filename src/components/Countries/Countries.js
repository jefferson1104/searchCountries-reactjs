import React, { Component } from 'react';
import Country from './Country';

//importando css
import css from './Countries.module.css';

export default class Countries extends Component {
  render() {
    const { countries } = this.props;

    return (
      <div className={`${css.border} ${css.flexRow}`}>
        {countries.map((country) => {
          return <Country key={country.id} country={country} />
        })}
      </div>
    );
  }
}