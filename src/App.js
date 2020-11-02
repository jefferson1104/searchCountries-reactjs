import React, { Component } from 'react';
import Countries from './components/Countries/Countries';
import Header from './components/Header/Header';

export default class App extends Component {
  //estado da aplicacao
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: ''
    };
  }

  //lifecycle com componentDidMount(), fazendo requisicoes http da api
  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    //separando dados da API
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population,
      }
    });

    const filteredPopulation =  this.calculateTotalPopulationFrom(allCountries);

    //atribuindo as informacoes da api no estado
    this.setState({
      allCountries: allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation,
    });
  }

  //metodo que fica calculando a populacao
  calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return totalPopulation;
  }  

  //Exibindo e executando filtros
  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    //filtrando os paises
    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = this.state.allCountries.filter(country => {
      return country.filterName.includes(filterLowerCase);
    });

    //filtrando a populacao por paises
    const filteredPopulation =  this.calculateTotalPopulationFrom(
      filteredCountries
    );

    this.setState({
      filteredCountries,
      filteredPopulation,
    });
  };

  render() {
    //desestruturando allCountries do this.state
    const { filteredCountries, filter, filteredPopulation } = this.state;

    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header 
          filter={filter} 
          countryCount={filteredCountries.length} 
          totalPopulation={filteredPopulation} 
          onChangeFilter={this.handleChangeFilter} 
        />

        <Countries countries={filteredCountries} />
      </div>
    )
  }
}

//maneira diferente de estilizar com css
const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};