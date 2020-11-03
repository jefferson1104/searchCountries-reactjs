import React from 'react';
import Country from './Country';

//importando css
import css from './Countries.module.css';

export default function Countries(props) {
  //desestruturando a props
  const { countries } = props;
  
  return (
    <div className={`${css.border} ${css.flexRow}`}>
      {countries.map((country) => {
        return <Country key={country.id} country={country} />
      })}
    </div>
  );
}