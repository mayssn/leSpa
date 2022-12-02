import styled from "styled-components";
import { useState, setState } from "react";

import { photoList } from "../data/photoList";




const BasicRows = ({ expand, setExpand }) => {

    const [imageSrc, setImageSrc] = useState(null)
    const [imgIndex, setImageIndex] = useState(null)
    // "../imgs/photos/5.jpeg" .  require("../imgs/photos/5.jpeg")

    // console.log("imgsrc", imageSrc)
    // console.log("expand", expand)
    console.log("ind", imgIndex)
    console.log("hii", photoList[0]["src"])

    const nextPhotoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let i = (imgIndex + 1); setImageSrc(photoList[i]["src"]); setImageIndex(i)
    }
    return (
        <>
            <Container>
                {photoList.map((x, i) => {

                    return (
                        <Div onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpand(!expand);
                            setImageSrc(x.src);
                            setImageIndex(i)
                        }}>
                            <Img src={x.src}
                                alt="hi" height={300} width={300} />
                        </Div>
                    )

                })}
            </Container>
            {
                expand &&
                <>
                    <Back> </Back>
                    <ExpandedDiv>
                        <Expanded src={imageSrc} />
                        <button onClick={nextPhotoClick} hidden={(imgIndex === 11) ? true : false}> CLICK</button>
                    </ExpandedDiv>

                </>

            }
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
    border: 6px solid white;  //to prevent the box from moving

&:hover {
    border:6px solid rgba(221,221,210);
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
const Back = styled.div`
    background-color:white;
    position:fixed;
    opacity: 0.7;
    height:100vh;
    width:100vw;
    top:-10%`

const ExpandedDiv = styled.div`
    padding:20px;
    background-color:white;
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height:60vh;`

const Expanded = styled.img`
   height:60vh`



export default BasicRows;