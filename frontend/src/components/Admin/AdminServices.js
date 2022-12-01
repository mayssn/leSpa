import styled from "styled-components";
import img from "../../imgs/snap.png"
import { useEffect, setState, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminLogin from "./Adminlogin";





const AdminServices = ({ setConfirmation }) => {

    // disclaimer this code is more spaghetthi than the others especially since i created different states for each variable
    // i want to clean it up when I have time.  Also keep in mind, null values are ok here. in the backend, if null, we use existing values

    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState(null)
    const [treatmentsList, setTreatmentsList] = useState(null)
    const [pricelist, setPricelist] = useState(null)
    const [selectedTreatment, setSelectedTreatment] = useState(null)
    const [minutes, setMinutes] = useState(null)
    const [price, setPrice] = useState(null)
    const [treatmentID, setTreatmentId] = useState(null)
    const isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"))




    let navigate = useNavigate()



    const handleDelete = (e) => {
        e.preventDefault()
        console.log("treatmentID", treatmentID);
        fetch(`http://localhost:8000/api/delete-treatment/${treatmentID}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json())
            .then((data) => {
                (data.status === 400) ? console.log("treatment not found", data)
                    : (data.status === 200) ? setConfirmation("The service has been updated")
                        : console.log("unknown error", data);
            }).catch((error) => {
                console.log(error);
            }).then(() => navigate(`/admin/confirmation`))
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/api/update-treatment/${treatmentID}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                treatment: selectedTreatment,
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
                    navigate(`/admin/confirmation`)
                } else {
                    console.log("unknown error", data);
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }



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
            })
        }

    }, [selectedTreatment]);


    if (!isAuth) {
        return <AdminLogin />
    }

    return (
        <Wrapper>
            <Box>
                <Title> Edit Services</Title>
                <Form onSubmit={handleSubmit}>
                    <label>
                        <Label> Select Treatment Type: </Label>
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
                    {!selectedType ? <></> :   // additional steps to help protect data keys ensure that types is not empty
                        <>
                            <label>
                                <Label> Select Treatment: </Label>
                                <Select onChange={(e) => setSelectedTreatment(e.target.value)} disabled={selectedType ? false : true}>
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
                        </>
                    }
                    {!selectedTreatment ? <></> :   // additional steps to help protect data from crashing ensure we have an objectID
                        <>
                            <label>
                                <Label> Edit Name: </Label>
                                <Input type="text" name="updatedName" id="name" defaultValue={selectedTreatment} onChange={(e) => setSelectedTreatment(e.target.value)} />
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
                                    : <Input type="text" name="price" defaultValue={price} onChange={(e) => setPrice(e.target.value)}
                                    />
                                }

                            </label>
                            <Buttons>
                                <Submit type="submit" value="update"> Update </Submit>
                                <DelReset>
                                    <Delete type="reset" onClick={() => { window.location.reload() }}
                                    > Reset </Delete>
                                    <Delete onClick={handleDelete}> Delete </Delete>
                                </DelReset>
                            </Buttons>
                        </>
                    }

                </Form>
            </Box>
        </Wrapper >
    );
}

const Wrapper = styled.div`
    border: 1px solid gray;
    background-color: black;
    background-image: url(${img});
    padding: 0 0 100px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border: none;
    min-height: calc(100vh - 70px);
    `

const Box = styled.div`
    width: 900px;
    background-color: white;
    display: flex;
    justify-content: flex - start;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
    padding: 0 0 30px 0;
    `
const Select = styled.select`

    width: 500px;
    `


const Title = styled.h3`
    font-family: "Helvetica Neue";
    font-weight: lighter;
    font-size: 30px;
    color: gray;
    margin: 30px 0 15px 0 ;

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
    justify-content:space-between;`

export default AdminServices;


