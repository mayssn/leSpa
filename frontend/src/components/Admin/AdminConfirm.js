import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, setState, useState } from "react";
import img from "../../imgs/snap.png"
import styled from "styled-components";
import { CiCircleCheck } from "react-icons/ci"
import AdminLogin from "./Adminlogin";
const isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"))





const AdminConfirm = ({ confirmation }) => {

    if (!isAuth) {
        return <AdminLogin />
    }


    return (
        <Wrapper>
            <Box>
                {!confirmation ? <Title> Uh Oh, You have nothing to confirm! </Title> :
                    // Above code is in case they get into the page through the URL with nothing to confirm
                    <Title> <Span> <CiCircleCheck /></Span>{confirmation} </Title>}
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

const Span = styled.span`
    margin-right:20px`



export default AdminConfirm;

