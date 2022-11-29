import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, setState, useState } from "react";
import img from "../../imgs/snap.png"
import styled from "styled-components";





const AdminQuote = ({ setConfirmation }) => {
    const [newQuote, setNewQuote] = useState(null)
    const [input, setInput] = useState(null)
    let navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:8000/api/get-quote/")
            .then((response) => response.json())
            .then((data) => {
                console.log("here", data)
                if (data.status === 400) {
                    console.log(data.message)
                } else {
                    console.log(data.data)
                    setNewQuote(data.data)


                }
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setNewQuote(input)


        fetch("http://localhost:8000/api/update-quote/", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quote: newQuote }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    throw new Error(data.message);
                } else if (data.status === 200) {
                    console.log("hello", data);
                    setConfirmation("Your quote has been updated")
                    navigate(`/admin/confirmation`);
                } else {
                    console.log("unknown error", data);

                }
            })
            .catch((error) => {
                console.log(error);
            });

    }





    return (
        <Wrapper>
            <Box>
                <Title> Edit Quote </Title>
                <Quote>
                    {(!newQuote) ?
                        <div> Loading...</div>
                        : <div>{newQuote}</div>
                    }
                </Quote>
                <Form onSubmit={handleSubmit}>
                    <label>
                        <Input type="text" name="quote" onChange={(e) => setInput(e.target.value)} />
                    </label>
                    <Input type="submit" value="Submit" />
                </Form>
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
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin-top: 100px;
        `



const Title = styled.h3`
    font-family:"Helvetica Neue";
    font-weight: lighter;
    font-size: 30px;
    color: gray;
    margin: 40px 0

    `

const Form = styled.form`
    display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin-top: 0px;
`

const Quote = styled.div`
margin-top: 0px;`

const Input = styled.input`
margin-top: 20px;
width: 500px;
`



export default AdminQuote;

