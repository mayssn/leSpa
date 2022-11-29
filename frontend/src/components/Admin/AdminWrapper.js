import styled from "styled-components";
import img from "../../imgs/snap.png"

const AdminWrapper = () => {
    return (
        <Wrapper>
            <Box>


            </Box>
        </Wrapper >
    );
}

const Wrapper = styled.div`
    border: 1px solid gray;
    background-color: black;
    background-image: url(${img});
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
`

const Box = styled.div`
    width: 900px;
    height: 90%;
    background-color: white;
    `


const Li = styled.p`
    margin-right: 30px;

&:hover {
color:#27BCB9;
cursor: pointer;
}

&:hover {
    color:#27BCB9;
    cursor: pointer;
}
    
&a, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
}
`
export default AdminWrapper