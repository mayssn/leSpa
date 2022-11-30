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
                    zoom={10}
                    center={{ lat: 31.95393279257, lng: 35.8 }}
                    mapContainerClassName="mapcontainer"
                    yesIWantToUseGoogleMapApiInternals
                    style={{ height: '300px', width: "300px" }}
                >
                    {/* <AnyReactComponent
                        lat={latN}
                        lng={lngN}
                        text="My Marker"
                    /> */}
                    <Marker key={0} position={{ lat: 31.953932792573205, lng: 35.8836812195953 }} />
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