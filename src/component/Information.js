import React from 'react';
import './Information.css';

const Information = (props) => {
    let body = ''
    if (!props.capital) {
        body = 'Pick country to see information'
    }
    else {
        body = `
            Capital: ${props.capital}
            Region: ${props.region}
            Population: ${props.population}  
            Currency: ${props.currency}    
            Currency Name: ${props.currencyName}    
            Currency Symbol: ${props.currencySymbol}    
            `
    }
    //I really want to do this, but output too messy
    // for (var key in props){
    //     body += `${key}: ${props[key]}</br>`
    // }

    return (
        <div>
            <div className="card p-3 bg-light" >
                <img className="card-img-top" src={props.flag} alt={props.name}></img>
                <div className="card-body border-muted">
                    <h5 className="card-title"><strong>{props.name}</strong></h5>
                    <h6 className="card-text list-group">{body}</h6>
                </div>
            </div>

        </div>
    )
}
export default Information;