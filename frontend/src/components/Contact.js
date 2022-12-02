import styled from "styled-components";
import img from "../imgs/snap.png"
import { ContactInfo } from "../data/contactInfo";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import Maps from "./Maps";
import { useLoadScript } from '@react-google-maps/api';



const Contact = () => {

    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY })

    const data = ContactInfo
    // i'm mapping over the data that includes branch name, address, lat, lng, telephone , email 
    return (
        <Wrap>
            <Container>
                {
                    data.map(x => {
                        return (
                            <Branch key={x.location.lat}>
                                {(!isLoaded) ?
                                    <div>Loading...</div> :
                                    <Maps
                                        address={x.location.address}
                                        lat={x.location.lat}
                                        lng={x.location.lng} />}
                                <TextBox>
                                    <Title>{x.branch}</Title>
                                    <Box>
                                        <Icon>
                                            <CiLocationOn />
                                        </Icon>
                                        {x.location.address}
                                    </Box>
                                    <Box>
                                        <Icon>
                                            <BsTelephone />
                                        </Icon>
                                        {x.tel}
                                    </Box>
                                </TextBox>
                            </Branch>
                        )


                    }
                    )
                }
            </Container>

        </Wrap >
    );
}

const Wrap = styled.div`
    background-color: black;
    background-image: url(${img});
    /* height: calc(100vh - 100px); */
    color: black;
    font-family:"Helvetica Neue";
    font-size: 16px;
    padding: 0 0 40px 0;
    min-height: calc(100vh - 100px);
    `
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: -20px;
`

const Branch = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 40px;
    background-color: white;
    width: 600px;
    padding: 10px 50px;
    border-radius:12px;
    opacity: 0.75;
    padding: 30px;

    `

const Title = styled.p`
font-family:"Helvetica Neue";
    font-weight:light`

const Box = styled.div`
    display: flex;
    align-items:center;
    font-size: 14px;`


const Icon = styled.p`
    display: inline-flex;
    font-size:20px;
    margin-right:20px;`

const TextBox = styled.div`
    display: inline-flex;
    flex-direction: column;
    width:200px;
    margin-left:0;
    color:black;
    font-weight: light;
    `

export default Contact;