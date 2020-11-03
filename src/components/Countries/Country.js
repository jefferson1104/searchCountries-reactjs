import React from 'react';

//importando css
import css from './Countries.module.css';

export default function Country(props) {
  //desestruturando
  const { name, flag } = props.country;

  return (  
    <div className={`${css.country} ${css.border}`}>
      <img className={css.flag} src={flag} alt={name}/>
      <span className={css.countryName}>{name}</span>
    </div>
  );
}