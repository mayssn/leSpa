import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, setState, useState } from "react";
import img from "../../imgs/snap.png"
import styled from "styled-components";
import AdminLogin from "./Adminlogin";




const AdminAbout = ({ setConfirmation }) => {
    const [oldText, setOldText] = useState(null)
    const [newText, setNewText] = useState(null)
    let navigate = useNavigate();
    const isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"))


    useEffect(() => {
        fetch("http://localhost:8000/api/get-about/")
            .then((response) => response.json())
            .then((data) => {
                console.log("here", data)
                if (data.status === 400) {
                    console.log(data.message)
                } else {
                    console.log(data.data)
                    setOldText(data.data)

                }
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:8000/api/update-about/", {
            method: "PATCH",
            body: JSON.stringify({ about: newText }),
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
                    setConfirmation("About us- has been updated.")
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
                <Title> About Us:</Title>
                <Text>
                    {(!oldText) ?
                        <div> Loading...</div>
                        :
                        <>
                            <Text>
                                {oldText}
                            </Text>
                        </>
                    }
                </Text>
                <Form onSubmit={handleSubmit}>
                    <Label> Edit text:</Label>
                    <label>
                        <Input type="text" name="text" onChange={(e) => setNewText(e.target.value)} />
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
        background-color: white;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin: 60px 0 100px 0;
        padding: 0 0 40px 0;
        `


const Title = styled.h3`
    font-family:"Helvetica Neue";
    font-weight: lighter;
    font-size: 30px;
    color: gray;
    margin: 40px 0;

    `

const Form = styled.form`
    display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin-top: 0px;
`

const Text = styled.div`
margin-bottom: 7px;
border: dotted 0.1em gray;
padding: 30px;
font-size:10px;`

const Label = styled.p`
    margin: 20px 0;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    
`

const Input = styled.input`
margin: 7px 0 20px 0;
width: 500px;
`


export default AdminAbout;
