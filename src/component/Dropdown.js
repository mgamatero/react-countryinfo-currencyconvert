import React from 'react';


class Dropdown extends React.Component {
 
  selectValue = (e) => {
    this.props.CountryCodeFromDropDown(e.target.value)
  }



  render() {
    let countryInfo = this.props.state;
    let dropDownName = countryInfo.countryInfo.map((countryName) =>
      <option value={countryName.code} key={countryName.code}>{countryName.name}</option>
    )

    return (
      <div className="form-group">
        <div>Select Country:</div>
        <select className="form-control" onChange={this.selectValue} >
          <option className="dropdown-item" value='undefined' >Pick from list below</option>
          {dropDownName}
        </select>
      </div>
    )
  }
}


export default Dropdown;
