
import { useEffect, setState, useState } from "react";
import img from "../imgs/snap.png"
import styled from "styled-components";
const isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"))






const NotFoundPage = ({ }) => {


    return (

        <Wrapper>
            <Box>
                <H1> 404</H1>
                <Title> Oops! We cannot find the page your are looking for. </Title>
            </Box>
        </Wrapper >
    );

}


const Wrapper = styled.div`
        border: 1px solid gray;
        background-color: black;
        background-image: url(${img});
        height: calc(100vh - 100px);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        border: none;
    `

const Box = styled.div`
        width: 900px;
        height: 50%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 100px;
        `



const Title = styled.h3`
    font-family:"Helvetica Neue";
    font-weight: lighter;
    font-size: 30px;
    color: gray;
    margin: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    `

const H1 = styled.h1`
    font-size:100px;
    margin-bottom:10px;
    color: gray`

export default NotFoundPage;

