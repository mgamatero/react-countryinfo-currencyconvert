import React from 'react';


class Dropdown extends React.Component {

  // state = {
  //   countryCode:null
  // }




  selectValue = (e) => {
    this.setState({ countryCode: e.target.value })
    console.log("selected is " + e.target.value)
    this.props.CountryCodeFromDropDown(e.target.value)
  }



  render() {
    let countryInfo = this.props.state;
    let dropDownName = countryInfo.countryInfo.map((countryName) =>
      <option value={countryName.code} key={countryName.code}>{countryName.name}</option>
    )

    return (
      <div className="dropdown">
        <div>Select Country:</div>

        <select onChange={this.selectValue} >
          <option value='undefined' >Pick from list below</option>
          {dropDownName}
        </select>
      </div>
    )
  }
}


export default Dropdown;
