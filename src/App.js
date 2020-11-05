import React, { useState, useEffect } from 'react';

import Countries from './components/Countries/Countries';
import Header from './components/Header/Header';


export default function App() {
  //instanciando estados da aplicacao com useState()
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [userFilter, setUserFilter] = useState('');


  //efeitos utilizando useEffect() para consumir a api fazendo requisicao HTTP
  useEffect(() => {
    //funcao que faz requisicao
    const getCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all')
      let allCountries = await res.json();
      
      allCountries = allCountries.map(
        ({ name, numericCode, flag, population}) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          }
        }
      );

      //gravando resultado nos estados
      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
    }

    //executando a funcao
    getCountries();
  }, []);


  //funcao que calcula a populacao
  const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return totalPopulation;
  }  


  //funcao que exibe e executa os filtros
  const handleChangeFilter = (newText) => {
    setUserFilter(newText);

    //filtrando os paises
    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = allCountries.filter(country => {
      return country.filterName.includes(filterLowerCase);
    });

    //filtrando a populacao por paises
    const filteredPopulation =  calculateTotalPopulationFrom(
      filteredCountries
    );

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  };


  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>
      <Header 
        filter={userFilter} 
        countryCount={filteredCountries.length} 
        totalPopulation={filteredPopulation} 
        onChangeFilter={handleChangeFilter} 
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}


//maneira diferente de estilizar com css
const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};