import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, setState, useState } from "react";
import img from "../../imgs/snap.png"
import styled from "styled-components";
import AdminLogin from "./Adminlogin";




const AdminQuote = ({ setConfirmation }) => {
    const [oldQuote, setOldQuote] = useState(null)
    const [newQuote, setNewQuote] = useState(null)
    const [disableUpdate, setDisableUpdate] = useState(false) //website crashed if buttons clicked multipletimes
    const [disableDelete, setDisableDelet] = useState(false) //website crashed if buttons clicked multipletimes
    let navigate = useNavigate();
    const isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"))


    useEffect(() => {
        fetch("http://localhost:8000/api/get-quote/")
            .then((response) => response.json())
            .then((data) => {
                console.log("here", data)
                if (data.status === 400) {
                    console.log(data.message)
                } else {
                    console.log(data)
                    // website crashed when value was null so fixing it
                    data.data ? setOldQuote(data.data) : console.log("quote is null")

                }
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableUpdate(true) // disable button after being clicked

        fetch("http://localhost:8000/api/update-quote/", {
            method: "PATCH",
            body: JSON.stringify({ text: newQuote }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    throw new Error(data.message);
                } else if (data.status === 200) {
                    console.log("hello", data);
                    setConfirmation("Your quote has been updated")
                    navigate(`/admin/confirmation`)
                } else {
                    console.log("unknown error", data);

                }
            })
            .catch((error) => {
                console.log(error);
            })


    }


    if (!isAuth) {
        return <AdminLogin />
    }


    return (
        <Wrapper>
            <Box>
                <Title> Edit Quote </Title>
                <Quote>
                    {(!oldQuote) ?
                        <div> Loading...</div>
                        : <div>{oldQuote}</div>
                    }
                </Quote>
                <Form onSubmit={handleSubmit}>
                    <label>
                        <TextInput type="text" rows="4" name="quote" onChange={(e) => setNewQuote(e.target.value)} placeholder="Enter new quote!" />
                    </label>
                    <Input type="submit" value="Update" disabled={disableUpdate} />
                </Form>
            </Box>
        </Wrapper >
    );

}

const Wrapper = styled.div`
        border: 1px solid gray;
        background-color: black;
        background-image: url(${img});
        min-height: calc( 100vh - 30px);
        padding: 30px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        border: none;
    `

const Box = styled.div`
        min-width: 900px;
        height: 50%;
        background-color: white;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin-top: 30px;
        padding: 0 20px 50px 20px;
        `


const Title = styled.h3`
    font-family:"Helvetica Neue";
    font-weight: lighter;
    font-size: 30px;
    color: gray;
    margin: 40px 0 30px 0;

    `

const Form = styled.form`
    display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin-top: 0px;
`

const Quote = styled.div`
    color:gray;  
    box-sizing: border-box;
    margin-top: 0px;
    border: dotted 1px gray;
    min-width:600px;
    padding: 20px;
    font-size: 12px;
    display:flex;
    text-align:center;
    justify-content:center;
`

const Label = styled.p`
margin: 20px 0;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
font-size: 12px;
color: gray;

`

const TextInput = styled.textarea`
margin: 7px 0 10px 0;
width: 600px;
margin-top:30px;`

const Input = styled.input`
margin-top: 10px;
width: 610px;
height:30px;
`


export default AdminQuote;
