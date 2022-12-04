import React from "react";
import styled from "styled-components";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Footer = () => {
    // music player 
    return (
        <Wrapper>
            <AudioPlayer
                src={require('../music/dis.mp3')}
            />
            <H1> Play some relaxing music! </H1>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 80px;
    color: white;
    text-align: center;

`
const H1 = styled.h1`
    position: absolute ;
    top: 60%;
    left: 10%;
    font-size: 16px;
    transform: translate(-50%, -50%);
    color: gray ;
    font-family:" Arial, Helvetica, italic, sans-serif";`

export default Footer;