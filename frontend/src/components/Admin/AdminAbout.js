import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, setState, useState } from "react";
import img from "../../imgs/snap.png"
import styled from "styled-components";
import AdminLogin from "./Adminlogin";




const AdminAbout = ({ setConfirmation }) => {


    // I was hesitant to do allow user to edit about because I had the text 
    // nicely paragraphed with styles. Then I decided to do it and allow user to paragaph. 
    // the user aka Mom, can now type <Mayss> everytime she wants a new paragraph. 
    // the text will be split into an array, and then a .map will render each div. 


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



    const oldTextSplit = oldText ? oldText.split("Mayss") : "loading"
    // console.log(oldTextSplit),

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:8000/api/update-about/", {
            method: "PATCH",
            body: JSON.stringify({ text: newText }),
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
            {(!oldText || !oldTextSplit) ?
                <div> Loading...</div> :
                <>
                    <Box>
                        <Title> About Us:</Title>
                        <Text>
                            {oldTextSplit.map((paragraph) => {
                                return (
                                    <Paragraph> {paragraph}</Paragraph>
                                )
                            })}
                        </Text>

                        <Form onSubmit={handleSubmit}>
                            <Label> Hi Mom! remember to type Mayss everytime you need a new paragraph:</Label>
                            <label>
                                <Textarea type="text" rows="10" cols="50" name="text" defaultValue={oldText} onChange={(e) => setNewText(e.target.value)} />
                            </label>
                            <Input type="submit" value="Update" />
                        </Form>
                    </Box>
                </>}
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
        padding: 0 0 60px 0;
    `

const Box = styled.div`
        background-color: white;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin: 30px 0 100px 0;
        padding: 0 50px 20px 50px;
        `


const Title = styled.h3`
    font-family:"Helvetica Neue";
    font-weight: lighter;
    font-size: 30px;
    color: gray;
    margin: 30px 0 20px 0;

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
    width: 600px;
    padding: 30px;
    font-size:10px;
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

const Input = styled.input`
margin: 7px 0 20px 0;
width: 700px;
height:30px
`
const Textarea = styled.textarea`
margin: 7px 0 10px 0;
width: 700px;`

const Paragraph = styled.div`
    display:flex;
    text-align:center;
    justify-content: center;
    margin: 10px 0`

export default AdminAbout;
