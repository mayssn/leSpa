import styled from "styled-components";
import img from "../../imgs/snap.png"
import { useEffect, setState, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminLogin from "./Adminlogin";







const AdminAddService = ({ setConfirmation }) => {
    const [types, setTypes] = useState([])
    const [disabled, setDisabled] = useState(true);
    const isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"))


    let navigate = useNavigate()


    const [formData, setFormData] = useState({
        "selectedType": null,
        "treatment": null,
        "minutes": null,
        "price": null,
    });

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    useEffect(() => {
        (Object.values(formData).includes("") ||
            formData.selectedType === null ||
            formData.treatment === null ||
            formData.minutes === null ||
            formData.price === null)
            ? setDisabled(true)
            : setDisabled(false);
    }, [formData]);



    const handleSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        fetch("http://localhost:8000/api/add-treatment", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    throw new Error(data.message);
                } else if (data.status === 200) {
                    setConfirmation("The service has been added")
                    navigate(`/admin/confirmation`)
                } else {
                    console.log("unknown error", data);
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        fetch("http://localhost:8000/api/get-treatment-types")
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 400) {
                    console.log(data)
                } else if (data.status === 200) {
                    setTypes(data.data)
                } else {
                    console.log("unknown error", data)
                }
            })
    }, []);


    if (!isAuth) {
        return <AdminLogin />
    }

    return (
        < Wrapper >
            {(!types) ? <div>loading...</div> :
                <>
                    <Box>
                        <Title> Add New Service</Title>
                        <Form onSubmit={handleSubmit}>
                            <label>
                                <Label> Treatment Type: </Label>
                                <Select name="selectedType" onChange={changeHandler}>
                                    <option selected disabled hidden>Select Type</option>
                                    {types.map(type =>
                                        <option key={type}
                                            value={type}
                                        > {type}</option>
                                    )}
                                </Select>
                            </label>
                            <label>
                                <Label> Treatment Name: </Label>
                                <Input type="text" name="treatment" id="name" onChange={changeHandler} />
                            </label>
                            <label>
                                <Label> Minutes: </Label>
                                <Input type="text" name="minutes" onChange={changeHandler} />
                            </label>
                            <label>
                                <Label> Price: </Label>
                                <Input type="text" name="price" onChange={changeHandler} />
                            </label>
                            <Buttons>
                                <Submit type="submit" value="update" disabled={disabled}> Update </Submit>
                                <DelReset>
                                    <Delete type="reset" onClick={() => { window.location.reload() }}> Reset </Delete>
                                </DelReset>
                            </Buttons>
                        </Form>
                    </Box>
                </>}
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
    min-height: 95vh;
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

&:hover {
    cursor: pointer;
}

&:disabled: {
    cursor: disabled;
  }
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

export default AdminAddService;
