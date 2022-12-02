import styled from "styled-components";
import { useState } from "react";

import { photoList } from "../data/photoList";



const BasicRows = () => {
    const [expand, setExpend] = useState(null)
    // "../imgs/photos/5.jpeg" .  require("../imgs/photos/5.jpeg")
    return (
        <>
            <Container>
                {photoList.map((x, i) => {
                    console.log(x.src)
                    return (
                        <Div onclick>
                            <Img src={x.src}
                                alt="hi" height={300} width={300} />
                        </Div>
                    )

                })}
            </Container>
        </>

    )
}
const Div = styled.div`
display:flex;
flex-direction:column;
background-color: white;
padding:4px 4px 2px 4px;
margin:10px;
box-shadow:10px 10px 7px rgba(0,0,0,.7);
border-bottom: 6px solid white;  //to prevent the box from moving

&:hover {
    border-bottom:6px solid yellow;
    cursor: pointer;
}

`


const Container = styled.div`
margin-top: 60px;
  border: none;
  display: grid;
  grid-template-columns: 33% 33% 33%;
`

const Img = styled.img`
margin: 10px;
`


export default BasicRows;