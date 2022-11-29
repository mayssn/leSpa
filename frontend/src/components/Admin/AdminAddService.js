import styled from "styled-components";
import img from "../../imgs/snap.png"


const AdminAddService = () => {
    return (
        <Wrapper
        >

        </Wrapper >
    );
}

const Wrapper = styled.div`
    border: 1px solid gray;
    background-color: black;
    background-image: url(${img});
    height: calc(100vh - 100px);
`

export default AdminAddService;