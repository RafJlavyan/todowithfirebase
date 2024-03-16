import styled from "styled-components";

const MyInput = ({ ...props }) => {
  return <Input type="text" {...props} />;
};

export default MyInput;

const Input = styled.input`
  background-color: transparent;
  border: none;
  border: 1px solid #22282c;
  width: 100%;
  padding: 10px;
`;
