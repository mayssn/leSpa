import styled from "styled-components";
import img from "../imgs/snap.png"
import TreatmentsList from "./TreatmentsList";



const Services = () => {
    return (
        <Wrapper>

            <Treatments>
                {/* <Title2> Treatments: </Title2> */}
                <TreatmentsList></TreatmentsList>
            </Treatments>



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
    padding: 0 0 100px 0;
`
const About = styled.div`
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

const Title2 = styled.h3`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    font-family:"Helvetica Neue";
    margin-top:70px;
`

const Text = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Gallery = styled.div``

const Treatments = styled.div``


export default Services;