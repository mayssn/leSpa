import React from "react";
import styled from "styled-components";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Footer = () => {
    return (
        <Wrapper>
            <AudioPlayer
                autoPlay
                src={require('../music/dis.mp3')}
            />
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

export default Footer;