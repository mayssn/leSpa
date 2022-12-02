import styled from "styled-components";
import { useEffect, setState, useState } from "react";

const TreatmentsList = () => {

    const [pricelistF, setPricelistF] = useState(null)
    const [typesF, setTypesF] = useState(null)
    const [selectedTypeF, setSelectedTypeF] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/get-pricelist/")
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    console.log(data)
                } else {
                    let pricel = data.data.sort((a, b) => (a.treatment > b.treatment ? 1 : -1))
                    let typesArray = [... new Set(pricel.map(x => x.type))];
                    setPricelistF(pricel)
                    setTypesF(typesArray)

                }
            })
    }, []);

    // console.log("target", selectedTypeF)
    return (



        <ContainerColumn>

            {(!selectedTypeF) ?
                <Title>Select Type:</Title> :
                <></>}

            {(!pricelistF || !typesF) ?
                <div>loading...</div> :
                <>
                    <ContainerBtn>
                        {typesF.map(x => (
                            <TypeBtn className={(selectedTypeF !== x.type ? "inactive" : "active")}
                                name={x} onClick={(e) => { setSelectedTypeF(e.target.name) }}> {x.toUpperCase()} </TypeBtn>
                        ))}
                    </ContainerBtn>
                    <ContainerColumn>{
                        pricelistF.map(x => {
                            if (x.type === selectedTypeF) {
                                return (
                                    <ContainerRow >
                                        <Service> {x.treatment} </Service>
                                        <Detail> {x.minutes} minutes/ </Detail>
                                        <Detail> {x.price} JOD</Detail>
                                    </ContainerRow>
                                )
                            }
                        })
                    }

                    </ContainerColumn>
                </>}

        </ContainerColumn>

    );
}

const ContainerRow = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    font-family:"Helvetica Neue";
    align-items:center;
    justify-content:center;
`

const ContainerBtn = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-evenly;
    margin:60px 0;
`

const ContainerColumn = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`

const Wrapper = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const TypeBtn = styled.button`
    border: none;
    background-color: transparent;
    color:white;
    font-size: 20px;
    position: relative; 
    padding: 1.4rem 4.2rem;
    padding-right: 3.1rem;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 1.1rem;
    text-transform: uppercase;
    transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);  
    cursor: pointer;


&:hover {
    color: gray;
    opacity: 0.3;
    font-size: 4rem 6rem;
    background: white;
    opacity: 0.3;
}

.active {
        font-size: 10rem 10rem;
        color:black;
        background-color: red;
    }
`

const Service = styled.p`
    width:300px;
    margin:0 20px;
    font-weight:medium;
    `

const Detail = styled.p``

const Title = styled.h3`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 100px;
    font-family:"Helvetica Neue";;
`


export default TreatmentsList;