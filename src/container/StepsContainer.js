import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import DisplaySection from '../components/DisplayFlags'
import '../style/sass/3-modules/_searchBox.sass';
import { connect } from 'react-redux';
import {
  fetchContinents, fetchCountries, UpdateSelectedContinent, UpdateCountriesToDisplayFlags
} from '../actions';

class StepsContainer extends Component {

  state = {
    selectedContinent: "",
    selectedCountries: [],
    clearFlags: ''
  }


  componentWillMount() {
    this.props.fetchContinents();
  }

  /*
      This function gets triggered on Selection of Continent in the first Search Box and
      Load the country information from the function getCountriesFromJSON with the continent value
  */
  selectedContinentText = (text, ...args) => {
    this.setState({ selectedContinent: text })
    this.props.fetchCountries(text);
    this.props.UpdateSelectedContinent(text, args[0] || false);
  }

  /* Loads the selected countries to Display the flags */
  selectedCountriesList = (data) => {
    this.setState({ selectedCountries: data })
    this.props.UpdateCountriesToDisplayFlags(data);
  }

  /*clear flags*/
  clearFlags = () => {
    this.props.UpdateSelectedContinent('', true);
  }

  render() {

    const displayFlagSection = (
      this.props.selectedCountriesToDisplayFlag.map(data => {
        return <DisplaySection
          countryCode={data.code}
          countryName={data.name}
          flag={data.flag}
          id={data.code}
          key={data.code}
        />
      })
    );

    const continentSections = (
      <SearchBox
        name="continent"
        placeholder="Search Continent"
        source={this.props.continents}
        selectedTextOnClick={this.selectedContinentText}
        isContinentSelected={this.props.isContinentSelected}
      />
    )

    const countrySection = (
      <SearchBox
        name="country"
        placeholder="Search Country"
        source={this.props.countries}
        selectedCheckedList={this.selectedCountriesList}
        multiple={true} />
    );

    const selectedContinent = (
      this.props.isContinentSelected ?
        <div>
          <h4 style={{ color: '#626B7A' }}> You Selected: </h4>
          <h2>{this.state.selectedContinent}</h2></div> : null
    );

    const countrySlectionMessage = (
      this.props.isContinentSelected ?
        <div>
          <h2>Step 2</h2>
          <p style={{ color: '#626B7A' }}>Now, select a country</p>
        </div>: null
    );

    const selectedFlags = (
      this.state.selectedCountries.length > 0 ?
        <div>
          <h2>Selected Flags</h2>
          <div className="steps-container">{displayFlagSection}</div>
          <button className="clearflag-button" onClick={this.clearFlags} >Clear flags</button>
        </div> : null
    )

    return (
      <div className="steps-container">
        <div className='card'>
          <div>
            <h2>Step 1</h2>
            <p style={{ color: '#626B7A' }}>Select a Continent</p>
          </div>
          {continentSections}
          {selectedContinent}
        </div>
        <div className='card'>
          {countrySlectionMessage}
          {this.props.isContinentSelected && countrySection}
        </div>
        <div className='card'>
          {selectedFlags}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    continents: state.flagPicker.continents,
    countries: state.flagPicker.countries,
    isContinentSelected: (state.flagPicker.continents.filter(c => c.isSelected).length > 0),
    selectedCountriesToDisplayFlag: state.flagPicker.countries.filter(c => c.isSelected)
  }
}

export default connect(mapStateToProps, { fetchContinents, fetchCountries, UpdateSelectedContinent, UpdateCountriesToDisplayFlags })(StepsContainer);