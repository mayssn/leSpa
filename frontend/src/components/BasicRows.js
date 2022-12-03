import styled from "styled-components";
import { useState, setState } from "react";
import { photoList } from "../data/photoList";



// i was going to use a libary that wanted me to create a component called basic rows, i didn't end up using it but kept the name :)
const BasicRows = ({ expand, setExpand }) => {

    const [imageSrc, setImageSrc] = useState(null)
    const [imgIndex, setImageIndex] = useState(null)


    // when the photo is expanded, they need to go to the next image
    // if user reaches the end, then on click should exit.

    const nextPhotoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (imgIndex !== 11) {
            let i = (imgIndex + 1); setImageSrc(photoList[i]["src"]); setImageIndex(i)
        }
        else { setExpand(false) }
    }


    // when the photo is expanded, they need to go to the previous image

    const backPhotoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let i = (imgIndex - 1); setImageSrc(photoList[i]["src"]); setImageIndex(i)
    }


    // clicking anywhere on the page sets expand image to false, which 
    // hides the image. only by clicking the little image does it set it to true
    // had to use stop propagation to overwrite the background click function that sets it to false

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
                    <BtnBck onClick={backPhotoClick} hidden={(imgIndex !== 0) ? false : true}>
                        BACK
                    </BtnBck>
                    <BtnNxt onClick={nextPhotoClick} >
                        {(imgIndex !== 11) ? "NEXT" : "THE END"} </BtnNxt>
                    <ExpandedDiv>
                        <Expanded src={imageSrc} />
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
    box-shadow:6px 4px 3px rgba(0,0,0,.4);
    border: 6px solid white;  //to prevent the box from moving

&:hover {
    box-shadow:10px 8px 5px rgba(0,0,0,.6);
    border:6px solid white;
    cursor: pointer;
    /* outline:black 2px inset; */
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
    opacity: 0.99;
    height:100vh;
    width:100vw;
    top:-10%;`

const ExpandedDiv = styled.div`
    padding:20px;
    background-color:white;
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height:60vh;
    padding:3px;
    outline: double 1px black;
    border:4px solid white`

const Expanded = styled.img`
   height:60vh;`

const BtnNxt = styled.button`
    position:fixed;
    top: 50%;
    left: 87%;
    transform: translate(-50%, -50%);
    font-size:40px;
    width: 300px;
    border: none;
    color:gray;
    background-color:transparent;
    font-size:100px;
    color:black;
    font-family:"Helvetica Neue";
    font-weight: lighter;
    &:hover{
        cursor: pointer;
    }
  `

const BtnBck = styled.button`
    position:fixed;
    top: 50%;
    left: 13%;
    transform: translate(-50%, -50%);
    font-size:40px;
    width: 300px;
    border: none;
    color:gray;
    background-color:transparent;
    font-size:100px;
    color:black;
    font-family:"Helvetica Neue";
    font-weight: lighter;

    &:hover{
        cursor: pointer;
    }
`

export default BasicRows;