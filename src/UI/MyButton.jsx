import styled from "styled-components";

const MyButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default MyButton;

const Button = styled.button`
  border: none;
  border: 1px solid #22282c;
  width: 100%;
  padding: 10px;
  background-color: #22282c;
  color: #d8d8d8;
  cursor: pointer;
`;
