import React from "react";
import styled from "styled-components";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import GlobalStyle from "./GlobalStyle"
import { useEffect, setState, useState } from "react";

//TODO center quote


const Home = () => {

    const [quote, setQuote] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/get-quote")
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    console.log(data.message)
                } else {
                    console.log(data.data)
                    setQuote(data.data)

                }
            })
    }, [setQuote]);

    return (

        <Wrapper>
            <Video loop autoPlay muted>
                <source src={require('../music/waterloop.mp4')} type="video/mp4" />
            </Video>
            {(!quote) ?
                <Text>Welcome to Le Spa</Text> :
                <Text>{quote}</Text>
            }
        </Wrapper >


    );
}

export default Home;

const Wrapper = styled.div`
                position: relative;
                background-color: white;
                min-height: 60vh;
                padding: 0;
                margin:0;
                background-color:rgba(66,170,182,255);`

const Video = styled.video`
                width: 100vw;
                height: auto !important;
                background-color: black;
                `

const Text = styled.p`
    position: absolute;

  
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* width: 100%;
    height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
    color: white;  
    font-style: italic;
    `