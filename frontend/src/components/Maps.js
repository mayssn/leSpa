import React from 'react'
import GoogleMapReact from 'google-map-react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import "./maps.css"
import styled from "styled-components";

//TODO Env Fil


const Maps = ({ address, lat, lng }) => {
    console.log("maps", address)




    const lngN = Number(lng)
    const latN = Number(lat)
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY })
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    return (

        <>
            <div>
                <GoogleMap
                    zoom={16}
                    center={{ lat: latN, lng: lngN }}
                    mapContainerClassName="mapcontainer"
                    yesIWantToUseGoogleMapApiInternals
                    style={{ height: '300px', width: "300px" }}
                >
                    <Marker key={0} position={{ lat: latN, lng: lngN }} />
                </GoogleMap>
            </div>


        </>




    )
}
const mapContainerClassName = styled.div`
width:100px;
height:100px;
background-color:black`



export default Maps;