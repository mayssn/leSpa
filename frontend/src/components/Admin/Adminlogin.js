import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import img from "../../imgs/snap.png";
import AdminQuote from "./AdminQuote";

const AdminLogin = () => {
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({ status: false, message: "" });
  const [value, setValue] = useState(null)
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();
  const isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"));

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(value)

  useEffect(() => {
    Object.values(formData).includes("") ||
      // formData.email.length >= 1 ||
      // formData.password.length >= 1
      // ||
      formData.email === null ||
      formData.password === null
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("here");
          window.sessionStorage.setItem("isAuth", JSON.stringify(data.data));
          navigate("/admin/quote");
        } else {
          setError({ status: true, message: data.message });
        }
      });
  };

  const removeError = (e) => {
    setError({ ...formData, status: false });
  };

  if (isAuth) {
    return <AdminQuote />;
  }

  return (
    <Wrapper>
      <Box>
        <Form onSubmit={handleLogin}>
          <Title> Hi Mom! </Title>
          <Input
            type="email"
            placeholder="email"
            name="email"
            onChange={changeHandler}
            onFocus={removeError}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            onChange={changeHandler}
            onFocus={removeError}
          />
          {error.status && <ErrorMsg>{error.message}</ErrorMsg>}
          <Button disabled={disabled}>Log in</Button>
        </Form>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid gray;
  background-color: black;
  background-image: url(${img});
  height: calc(100vh - 100px);
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  padding: 30px 40px 60px 60px;
  width: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 100px;
`;

const Input = styled.input`
  margin: 15px 0;
  min-width: 270px;
`;

const Button = styled.button`
  width: 280px;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
  }
  &:disabled: {
    cursor: disabled;
  }
`;

const Title = styled.h2`
  color: grey;
  opacity: 0.9;
`;

const ErrorMsg = styled.div`
  min-width: 270px;
  padding: 0px 0;
  font-size: 10px;
  color: red;
`;
export default AdminLogin;
