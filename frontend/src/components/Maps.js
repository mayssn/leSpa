import React from 'react'
import GoogleMapReact from 'google-map-react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import "./maps.css"
import styled from "styled-components";




const Maps = ({ address, lat, lng }) => {
    console.log("maps", address)


    const lngN = Number(lng)
    const latN = Number(lat)
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyCh_zx4qawF0Xx70tk6tRz100L7i7PWN64" })
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    return (

        <>
            <div>
                <GoogleMap
                    zoom={10}
                    center={{ lat: 31.9, lng: 35.8 }}
                    mapContainerClassName="mapcontainer"
                    yesIWantToUseGoogleMapApiInternals
                    style={{ height: '300px', width: "300px" }}
                >
                    {/* <AnyReactComponent
                        lat={latN}
                        lng={lngN}
                        text="My Marker"
                    /> */}
                    <Marker key={0} position={"31.953932792573205, 35.8836812195953"} />
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