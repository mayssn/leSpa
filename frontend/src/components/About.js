import styled from "styled-components";
import img from "../imgs/snap.png"
import TreatmentsList from "./TreatmentsList";


const About = () => {
    return (
        <Wrapper>
            <Container>
                <Title> About us: </Title>
                <Text>
                    Le Spa is sanctuary for relaxation and rejuvenation that is dedicated to your inner happiness and healing.
                </Text>
                <Text>
                    Our aim is to connect mind, body, and soul by offering health and wellness services.
                </Text>
                <Text>
                    We invite you to visit our locations in Abdoun as well as Swifieh Village!
                </Text>
            </Container>



        </Wrapper >
    );
}
const Wrapper = styled.div`
    background-color: black;
    background-image: url(${img});
    margin-top: 0;
    color:white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 300px 0;
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
    font-family:"Helvetica Neue";;
`

const Text = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export default About;