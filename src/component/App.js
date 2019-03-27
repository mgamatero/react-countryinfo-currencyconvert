import React from 'react';
import Dropdown from './Dropdown';
import Information from './Information';
import CurrencyConverter from './CurrencyConverter';
import './App.css';
// import MapGeocode from './MapGeocode';
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
        selectedCurrencyConversionRate:0,
        convertedAmount:0
    }

    //*********************************************************************** */
    // This function takes loads JSON info from openaq.org and loads into state
    // *************************************************************************
    JSONloader = () => {
        axios.get('https://api.openaq.org/v1/countries/', {
        }).then((response) => {
            console.log(response.data.results)
            this.setState({ countryInfo: response.data.results })
            // console.log(this.state.countryInfo)
        });
    }


    //********************************************************************** */
    // This is a callback function used by Dropdown component.
    // 1) It takes a countryCode from the Dropdown 
    // 2) Uses the countryCode to fetch country data from "restcountries.eu"
    // 3) and sets properties to the state.
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
                selectedCountryLatLng: response.data[0].latlng
            })
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




    // https://docs.openexchangerates.org/docs/get-specific-currencies
    ConvertUSDToCurrency = (currency) => {
        axios.get('https://openexchangerates.org/api/latest.json', {
            params: {
                app_id: '10cc7ce732ed4688907b764cb946d649',
                symbols: currency,
                amount: this.state.dollarsToConvert
            }
        })
            .then((data) => {
                // console.log("converted" + JSON.stringify(data))
                // console.log(data.data.rates[this.state.selectedCountryCurrency])
                let rate = parseFloat(data.data.rates[this.state.selectedCountryCurrency])
                this.setState({selectedCurrencyConversionRate: rate})

                let convertedMoney = (rate * parseFloat(this.state.dollarsToConvert)).toFixed(2)
                this.setState({convertedAmount:convertedMoney})
                // console.log(`Rate: ${rate} * Dollars: ${this.state.dollarsToConvert} = ${convertedMoney})`)
            })
    }




    componentDidMount() {
        this.JSONloader();
    }



    componentDidUpdate() {


    }


    render() {


        return (
            
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="align-middle">
                                <div className="card bg-light m-3">
                                    <div className="card-body">
                                        <Dropdown state={this.state} CountryCodeFromDropDown={this.CountryCodeFromDropDown} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-none d-md-block col-md-4 m-3">
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

                        <div className="col-md-8 m-3">
                            <CurrencyConverter symbol={this.state.selectedCountryCurrencySymbol} currencyName={this.state.selectedCountryCurrencyName} rate={this.state.selectedCurrencyConversionRate} converted={this.state.convertedAmount} GetDollarFromCurrencyConverter={this.GetDollarFromCurrencyConverter} />
                        </div>


                    </div>
                </div>
            
        )
    }
}

export default App;

