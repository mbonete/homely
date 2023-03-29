import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import LinkButton from '../LinkButton/LinkButton';
import { useAPI } from '../../hooks/useAPI';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),

}).required();



function SignupForm() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const {createUser} = useAPI();

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit(createUser)}>
        <Title>Create a new account</Title>
        <Input {...register("name")} placeholder='name'/>
        {errors.name && <p>{errors.name.message}</p>}
        <Input {...register("email")} type="email" placeholder='email'/>
        <Input {...register("password")} type="password" placeholder='password'/>
        <ButtonWrapper>
          <LinkButton style={{width: '100%', backgroundColor: 'navy', color: 'white'}}>Create new account</LinkButton>
          <LinkButton to='/login' style={{width: '100%', backgroundColor: 'transparent', fontSize: '0.85rem' }}>Already have an account? Log in</LinkButton>
        </ButtonWrapper>
      </FormContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 30%;
  height: 70%;
  background-color: hsla(240, 25%, 79%, 1);
  padding: 32px;

`;
const Title = styled.h1`
  text-transform: uppercase;
  color: navy;
  font-size: 2rem;
  width: 80%;
  text-align: center;
`;

const FormContainer = styled.form`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin: 0 auto;
`;


const Input = styled.input`
  text-decoration: none;
  border: transparent;
  border-bottom: 1px solid navy;
  background-color: transparent;
  font-size: 1.25rem;
  color: navy;
  width: 100%;

  &::placeholder {
    text-transform: uppercase;
    color: hsla(240, 0%, 25%, 1);
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export default SignupForm;
