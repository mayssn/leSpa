import styled from "styled-components";
import img from "../../imgs/snap.png"
import { useEffect, setState, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";





const AdminServices = ({ setConfirmation }) => {
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState(null)
    const [treatmentsList, setTreatmentsList] = useState(null)
    const [pricelist, setPricelist] = useState(null)
    const [selectedTreatment, setSelectedTreatment] = useState(null)
    const [updatedName, setUpdatedName] = useState(null)
    const [minutes, setMinutes] = useState(null)
    const [price, setPrice] = useState(null)
    const [treatmentID, setTreatmentId] = useState(null)
    const [isDisabled, setIsDisabled] = useState(null)


    let navigate = useNavigate()



    const handleDelete = () => {

        fetch(`/api/delete-treatment/${treatmentID}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    throw new Error(data.message);
                } else if (data.status === 200) {
                    setConfirmation("The service has been updated")
                    navigate(`/admin/confirmation`);
                } else {
                    console.log("unknown error", data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    // to fetch the treatment types


    const handleSubmit = (event) => {
        event.preventDefault();


        fetch(`http://localhost:8000/api/update-treatment/${treatmentID}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: selectedType,
                treatment: updatedName,
                minutes: minutes,
                price: price
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    throw new Error(data.message);
                } else if (data.status === 200) {
                    console.log("hello", data);
                    setConfirmation("The service has been updated")
                    navigate(`/admin/confirmation`);
                } else {
                    console.log("unknown error", data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }



    // useEffect(() => {
    //     console.log("data", formData)
    //     Object.values(formData).includes("") || formData.order === "undefined"
    //         ? setIsDisabled(true)
    //         : setIsDisabled(false);
    // }, [formData]);








    const handleSelectType = (ev) => {
        setSelectedType(ev.target.value);
    }


    useEffect(() => {
        fetch("http://localhost:8000/api/get-pricelist/")
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    console.log(data)
                } else {
                    let pricel = data.data
                    let typesArray = [... new Set(pricel.map(x => x.type))];
                    setPricelist(pricel)
                    setTypes(typesArray)

                }
            })
    }, [selectedType]);






    useEffect(() => {
        if (selectedTreatment) {
            pricelist.map(x => {
                if (x.treatment === selectedTreatment) {
                    setMinutes(x.minutes)
                    setPrice(x.price)
                    setTreatmentId(x._id)

                }
            }
            )
        }

    }, [selectedTreatment]);

    console.log(selectedTreatment)


    console.log("id", treatmentID)
    console.log("treatment", selectedTreatment)
    console.log("min", minutes)
    console.log("Price", price)
    // console.log("pricelist", pricelist)
    // console.log("types", types)


    return (
        <Wrapper>
            <Box>
                <Title> Edit Services</Title>
                <Form id="editForm">
                    <label>
                        <Label> Treatment Type: </Label>
                        <Select onChange={handleSelectType}>
                            <option selected disabled hidden>Select Type</option>

                            {(!setTypes) ?
                                <option> loading</option>
                                : types.map(type =>
                                    <option key={type}
                                        value={type}
                                    > {type}</option>
                                )}
                        </Select>
                    </label>
                    <label>
                        <Label> Treatment Type: </Label>
                        <Select onChange={(e) => setSelectedTreatment(e.target.value)}>
                            <option selected disabled hidden></option>
                            {(!pricelist || !setTypes) ?
                                <option> loading</option>
                                : pricelist.map(x => {
                                    if (x.type == selectedType) {
                                        return (
                                            <option option key={x._id}
                                                value={x.treatment}
                                                required> {x.treatment}</option>

                                        )
                                    }
                                }
                                )}
                        </Select>
                    </label>
                    <label>
                        <Label> Edit Name: </Label>
                        <Input type="text" name="name" id="name" defaultValue={selectedTreatment} onChange={(e) => setSelectedTreatment(e.target.value)} />
                    </label>
                    <label>
                        <Label> Minutes: </Label>
                        {(!pricelist || !selectedTreatment || !selectedTreatment || !minutes) ?
                            <Input type="text" name="minutes" id="min" value="" />
                            : <Input type="text" name="minutes" defaultValue={minutes} onChange={(e) => setMinutes(e.target.value)} />

                        }
                    </label>
                    <label>
                        <Label> Price: </Label>
                        {(!pricelist || !selectedTreatment || !selectedTreatment || !price) ?
                            <Input type="text" name="price" id="price" value="" />
                            : <Input type="text" name="price" defaultValue={price} onChange={(e) => setPrice(e.target.value)} />
                        }

                    </label>
                    <Buttons>
                        <Submit type="submit" value="update" disabled={isDisabled}> Update </Submit>
                        <DelReset>
                            <Delete type="reset" onClick={() => { window.location.reload() }}> Reset </Delete>
                            <Delete onClick={handleDelete}> Delete </Delete>
                        </DelReset>
                    </Buttons>
                </Form>




            </Box>
        </Wrapper >
    );
}

const Wrapper = styled.div`
    border: 1px solid gray;
    background-color: black;
    background-image: url(${img});
 
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border: none;
    `

const Box = styled.div`
    width: 900px;
    height: 1000px;
    background-color: white;
    display: flex;
    justify-content: flex - start;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    `
const Select = styled.select`

    width: 500px;
    `


const Title = styled.h3`
    font-family: "Helvetica Neue";
    font-weight: lighter;
    font-size: 30px;
    color: gray;
    margin: 40px 0

        `

const Form = styled.form`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 0px;

    `

const Quote = styled.p`
    margin-top: 0px;
    `
const Input = styled.input`
    width: 500px;
    `

const Label = styled.p`
    margin: 20px 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    `
const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;



    `

const Submit = styled.button`
    width: 510px;
    height: 30px;
    padding: 0;


    `



const Delete = styled.button`
    border: none;
    margin-top: 20px;
    background-color: white;
    display: flex;
    align-items: flex - start;

    &:hover{
        color: red;
    }

    `

const DelReset = styled.div`
    display: flex;
    flex-direction:row;
    justify-content:space-between`

export default AdminServices;



    // useEffect(() => {

    //     fetch(`http://localhost:8000/api/get-treatment-byType/${selectedType}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.status === 400) {
    //                 console.log(data)
    //             } else {
    //                 console.log("Data", data)
    //                 setTreatmentsList(data.data)
    //             }
    //         })
    // }, []);