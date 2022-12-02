import styled from "styled-components";
import img from "../imgs/snap.png"
import { useEffect, useState } from "react";
import BasicRows from "./BasicRows";


const About = () => {
    const [aboutText, setAboutText] = useState(null)
    const [expand, setExpand] = useState(false)

    useEffect(() => {
        fetch("http://localhost:8000/api/get-about/")
            .then((response) => response.json())
            .then((data) => {
                console.log("here", data)
                if (data.status === 400) {
                    console.log(data.message)
                } else {
                    console.log(data.data)
                    setAboutText(data.data)

                }
            })
    }, []);
    // i'm splitting the text so it can be paragraphed
    const aboutTextSplit = aboutText ? aboutText.split("Mayss") : "loading"
    return (
        <Wrapper onClick={() => {
            setExpand(false)
        }}>
            <Container>
                <Title> About us: </Title>
                <>
                    {(!aboutText || !aboutTextSplit) ? <>Loading..</> :
                        aboutTextSplit.map((paragraph, i) => {
                            return (<Text key={i} >{paragraph}</Text>) // index just used to generate key
                        })}
                    <BasicRows expand={expand} setExpand={setExpand} />
                    {/* <img src={require("../imgs/photos/1.jpeg")} alt="hi" /> */}
                </>

            </Container>



        </Wrapper >
    );
}
const Wrapper = styled.div`
    background-color: black;
    background-image: url(${img});
    min-height: calc(100vh - 70px);
    margin-top: 0;
    color:white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 100px 0;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8px 100px 0 100px;

    `

const Title = styled.h3`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 100px;
    font-family:"Helvetica Neue";
    margin-bottom: 60px;
`

const Text = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export default About;