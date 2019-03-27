import React from 'react';

class CurrencyConverter extends React.Component {

    onSubmitCurrencyConverter = (event) => {
        event.preventDefault();
        let amount = document.getElementById("usdBox")
        this.props.GetDollarFromCurrencyConverter(amount.value)
    }

    render() {
        return (
            <div className="card bg-light" >
                <div className="card-body border-muted">
                    <h6 className="card-text">
                        <form>
                            <div className="card-title">
                                <button className="btn btn-primary" onClick={this.onSubmitCurrencyConverter}>Convert to {this.props.currencyName}</button>
                            </div>
                            <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                            </div>
                            
                            <input type="number" className="form-control" id="usdBox" min="0.01" step="0.01" default="0.00">
                            </input>
                            </div>
                            
                        </form>
                    </h6>
                    <h4 className="card-text text-info">{this.props.symbol}{this.props.converted}</h4>
                </div>
            </div>
        )
    }
}
export default CurrencyConverter;
