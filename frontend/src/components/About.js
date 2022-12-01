import styled from "styled-components";
import img from "../imgs/snap.png"
import { useEffect, setState, useState } from "react";


const About = () => {
    const [aboutText, setAboutText] = useState(null)

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

    const aboutTextSplit = aboutText ? aboutText.split("Mayss") : "loading"
    return (
        <Wrapper>
            <Container>
                <Title> About us: </Title>
                <>
                    {(!aboutText || !aboutTextSplit) ? <>Loading..</> :
                        aboutTextSplit.map((paragraph) => {
                            return (<Text>{paragraph}</Text>)
                        })}
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