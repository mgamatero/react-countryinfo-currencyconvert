import React from 'react';
import Dropdown from './Dropdown';
import Information from './Information';
import CurrencyConverter from './CurrencyConverter';
import './App.css';
import axios from 'axios';



class App extends React.Component {
    state = {
        countryInfo: [],
        selectedCountryCode: null,
        selectedCountryName: null,
        selectedCountryCapital: null,
        selectedCountryFlag: null,
        selectedCountryLatlng: [],
        selectedCountryRegion: null,
        selectedCountryPopulation: null,
        selectedCountryCurrency: null,
        selectedCountryCurrencyName: null,
        selectedCountryCurrencySymbol: null,
        dollarsToConvert: 0,
        selectedCurrencyConversionRate: 0,
        convertedAmount: 0,
        selectedCountryBackgroundImage: 'https://drflkq9jqzld5.cloudfront.net/sites/default/files/main/articles/2019/02/21/forex.jpg'
    }

    //*********************************************************************** */
    // This function takes loads JSON info from openaq.org and loads into state.
    // It will be used by the Dropdown component
    // *************************************************************************
    JSONloader = () => {
        axios.get('https://api.openaq.org/v1/countries/', {
        }).then((response) => {
            this.setState({ countryInfo: response.data.results })
            
        });
    }


    //********************************************************************** */
    // This is a callback function used by Dropdown component.
    // 1) It takes a countryCode selected from the Dropdown 
    // 2) Uses the countryCode to fetch country data from "restcountries.eu"
    // 3) and sets properties to the state.
    // 4) Uses helper function BackgroundUpdateFromCountry() - to update background
    //********************************************************************** */
    CountryCodeFromDropDown = (countryCode) => {
        this.setState({ selectedCountryCode: countryCode })
        axios.get(`https://restcountries.eu/rest/v2/alpha?codes=` + countryCode, {

        }).then((response) => {
            this.setState({
                selectedCountryName: response.data[0].name,
                selectedCountryCapital: response.data[0].capital,
                selectedCountryFlag: response.data[0].flag,
                selectedCountryRegion: response.data[0].region,
                selectedCountryPopulation: response.data[0].population,
                selectedCountryCurrency: response.data[0].currencies[0].code,
                selectedCountryCurrencyName: response.data[0].currencies[0].name,
                selectedCountryCurrencySymbol: response.data[0].currencies[0].symbol,
                selectedCountryLatLng: response.data[0].latlng,
                convertedAmount:0
            })
        }).then((response) => {
            this.BackgroundUpdateFromCountry()
        })
    }




    // *****************************************************************************
    // Callback function used by component CurrencyConverter.
    // It sets the value entered by user to state
    // *******************************************************************************
    GetDollarFromCurrencyConverter = (dollar) => {
        this.setState({ dollarsToConvert: parseFloat(dollar) })
        console.log("From CurrencyConverter -->  App: " + parseFloat(dollar))

        this.ConvertUSDToCurrency(this.state.selectedCountryCurrency)
    }


// ******************************************************************************
// Function that gets the exchange rate from USD to selected countries currency
// https://docs.openexchangerates.org/docs/get-specific-currencies
// ******************************************************************************
    ConvertUSDToCurrency = (currency) => {
        axios.get('https://openexchangerates.org/api/latest.json', {
            params: {
                app_id: '10cc7ce732ed4688907b764cb946d649',
                symbols: currency,
                amount: this.state.dollarsToConvert
            }
        })
            .then((data) => {
                //get the rate and setState
                let rate = parseFloat(data.data.rates[this.state.selectedCountryCurrency])
                this.setState({ selectedCurrencyConversionRate: rate })

                //calculate converted value and setState
                let convertedMoney = (rate * parseFloat(this.state.dollarsToConvert)).toFixed(2)
                this.setState({ convertedAmount: convertedMoney })
            })
    }

// ******************************************************************************************
// This function updates the background dynamically.  Unsplash API is used.
// ******************************************************************************************
    BackgroundUpdateFromCountry = () => {
        axios.get('https://api.unsplash.com/search/photos/', {
            params: { query: `'${this.state.selectedCountryName}'` },
            headers:
            {
                Authorization: 'Client-ID 5091f4b047af903d52662e847073ebad93e1db88e12030eb0b1ab957725d9086'
            }
        }).then((response) => {
            // console.log("Background Update" + response.data.results[0].urls.full)
            this.setState({ selectedCountryBackgroundImage: response.data.results[0].urls.regular })
        })

    }




    componentDidMount() {
        this.JSONloader();
    }



    componentDidUpdate() {
    }


    render() {
        return (
            <div style={{ backgroundColor: `black` }}>
                <div className="container" style={{ backgroundImage: `url("${this.state.selectedCountryBackgroundImage}")` }} >
                    <div className="row">
                        <div className="col">
                            <div className="align-middle">
                                <div className="card bg-light my-5">
                                    <div className="card-body">
                                        <Dropdown state={this.state} CountryCodeFromDropDown={this.CountryCodeFromDropDown} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-none d-md-inline col-md-4 mb-5">
                            <Information
                                name={this.state.selectedCountryName}
                                flag={this.state.selectedCountryFlag}
                                capital={this.state.selectedCountryCapital}
                                region={this.state.selectedCountryRegion}
                                population={this.state.selectedCountryPopulation}
                                currency={this.state.selectedCountryCurrency}
                                currencyName={this.state.selectedCountryCurrencyName}
                                currencySymbol={this.state.selectedCountryCurrencySymbol}
                                latLong={this.state.selectedCountryLatLng}
                            />
                        </div>
                        <div className="col-md-8 mb-5">
                            <CurrencyConverter symbol={this.state.selectedCountryCurrencySymbol} currencyName={this.state.selectedCountryCurrencyName} rate={this.state.selectedCurrencyConversionRate} converted={this.state.convertedAmount} GetDollarFromCurrencyConverter={this.GetDollarFromCurrencyConverter} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;

