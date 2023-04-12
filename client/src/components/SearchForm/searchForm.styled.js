import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 3px;
  width: 40%;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
`;

export const FormControl = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const FloatingLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0069d9;
  }
`;
