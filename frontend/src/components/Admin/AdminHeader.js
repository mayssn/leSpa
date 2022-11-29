import styled from "styled-components";
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import React, { useEffect } from 'react';

const clientId = '230048907089-ohgu32l0pf3k1uplra23p5rm2mq5qm3m.apps.googleusercontent.com';


const onSuccess = (res) => {
    console.log(res)
};

const onFailure = (err) => {
    console.log('failed', err);
};
const AdminHeader = () => {

    return (

        <Wrapper>
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
            </Right>



        </Wrapper>


    );

}


const Wrapper = styled.div`
    height: 30px;
    width: 100%;
    background-color:white;
    border: solid gray 0.05em;
    padding: 10px 30px;
    color: gray;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 15px;
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
    
&a, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
}
`


export default AdminHeader;