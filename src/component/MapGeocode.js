import React from 'react';


const MapGeocode = (props) => {

    let coords = '';

    if (typeof props.latLong === 'undefined') {
        return (
            <div className="spinner-border" role="status"> 
            <span className="sr-only">Loading...</span>
            </div>
        )
    }
    else {
        return (
            <div>

                Lat = {props.latLong[0]}  Long = {props.latLong[1]}
            </div>
        )
    }
}

export default MapGeocode;