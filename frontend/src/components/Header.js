import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';




const Header = () => {

    const isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"));
    const navigate = useNavigate();

    return (
        <>
            <Wrapper>
                <Left>
                    <Li>
                        <Link to="/"> Le Spa </Link>
                    </Li>
                </Left>
                <Right>
                    <Li>
                        <Link to="about"> About us </Link>
                    </Li>
                    <Li>
                        <Link to="services"> Our Services </Link>
                    </Li>
                    <Li>
                        <Link to="contact"> Contact us </Link>
                    </Li>
                </Right>
            </Wrapper>
            {isAuth &&
                <WrapperTwo>
                    <Left>
                        Admin Pannel
                    </Left>
                    <Right>
                        <Li>
                            <Link to="admin/quote"> Edit Quote </Link>
                        </Li>
                        <Li>
                            <Link to="admin/services"> Services </Link>
                        </Li>
                        <Li>
                            <Link to="admin/add"> Add New </Link>
                        </Li>
                        <Li>
                            <button onClick={() => { window.sessionStorage.removeItem("isAuth"); navigate("/") }}> Logout</button>
                        </Li>
                    </Right>
                </WrapperTwo>
            }
        </>



    );

}


const Wrapper = styled.div`
    height: 30px;
    width: 100%;
    background-color:white;
    padding: 10px 30px;
    color: gray;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 15px;
    `
const WrapperTwo = styled.div`
height: 30px;
width: 100%;
background-color:white;
padding: 10px 30px;
color: gray;
display: flex;
flex-direction: row;
justify-content: space-between;
font-size: 15px;
border-top:0.5px solid #a7adba;
`
const Left = styled.div`
    display: flex;
    justify-content: flex-start;
    font-family:"Helvetica Neue";
    align-items: center;
    font-size: 16px;

`
const Right = styled.div`
    display: flex;
    font-family:"Helvetica Neue";
    align-items: center;
    margin-right: 20px;

`

const Li = styled.p`
    margin-right: 30px;


&:hover {
    color:#27BCB9;
    cursor: pointer;
}

&:hover {
    color:#27BCB9;
    cursor: pointer;
}
    
& a, a: visited, a: hover, a:active {
    color: inherit;
    text-decoration: none;
}
`


export default Header;