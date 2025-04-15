import React from 'react';
import { GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';



const containerStyle = {
    width: '100%',
    height: '400px'
};


const Map = ({ lat, lng}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
        
    });
    

    if(!isLoaded) return <div>지도 불러오는중 ....</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat, lng }}
            zoom={14}
        >
            <Marker position={{ lat, lng}}/>
        </GoogleMap>
    );
};


export default Map;