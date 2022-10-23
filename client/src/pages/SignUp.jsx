import React,{useState} from 'react';
import axios from 'axios';
import {useMutation} from 'react-query';

export default function SignUp() 
{
  const[userParams,setUserParams]=useState({})
  const{mutate,data:backendResponse}=useMutation(submitForm)
  
  async function submitForm(e)
  {
    e.preventDefault();
    const req= await axios.post('http://localhost:8800/sign_up',userParams)
    return req.data
  }

    return (
      <main className='container'>
        {
          backendResponse!=='ok'&&(backendResponse?.length>0)&&<ErrorMsg backendResponse={backendResponse} />
        }
        <SignUpForm setUserParams={setUserParams} mutate={mutate}/>  
      </main>
    )
}

function SignUpForm({setUserParams,mutate})
{
    return(
      <div className='flex w-[100%] justify-center'>
        <form method='POST' onSubmit={mutate} className="flex flex-col w-[473px] max-w-[100%] gap-[1rem]" >
          <h1 className='title-form'>
             Registration
          </h1>
          <Input 
            name={'user-name'}
            max={16}
            min={5}
            type={'text'}
            placeholder={'Username'}
            underText={'Maximum of 16 characters'}
            func={(e)=>setUserParams(prev=>{return {...prev,userName:e.target.value}})}
           />
           <Input 
            name={'email'}
            type={'text'}
            placeholder={'Email address'}
            func={(e)=>setUserParams(prev=>{return {...prev,email:e.target.value}})}
           />
           <Input 
            name={'password'}
            type={'text'}
            placeholder={'Password'}
            min={6}
            max={16}
            underText={'Minimum of 6 characters'}
            func={(e)=>setUserParams(prev=>{return {...prev,password:e.target.value}})}
           />
           <Input 
            name={'password-retry'}
            type={'text'}
            placeholder={'Password confirmation'}
            min={6}
            max={16}
            func={(e)=>setUserParams(prev=>{return {...prev,passwordRetry:e.target.value}})}
           />
            <button className='button' type='submit'>register</button>
        </form>
      </div>
    )
}

function Input(props)
{
  const{
    name,
    max=null,
    min=null,
    func,
    type,
    placeholder,
    className='',
    underText=''
  }=props
  
  return (
    <div className='block'>
      <input
        className={`bg-secondary border-[1px] border-secondary text-white focus:border-[1px] focus:inset-0 outline-none focus:border-focus transition-all duration-[220] px-[.4rem] py-[.2rem] rounded-[.3rem] w-[100%] ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
        maxLength={max}
        onChange={func}
      />
      {
        underText&&
        <label htmlFor="" className='text-[#8f9ca7] text-[.8rem]'>
          {underText}
        </label>
      }
    </div>
  );
}

function ErrorMsg({backendResponse})
{
  return(
    <div className='bg-errorBg text-errorText px-[2rem] py-[.5rem]'>
       <strong>
          Looks like something went wrong...
       </strong>
       <ul>
        {
           backendResponse.map((error,pos)=>
            {
              return(
                <li key={pos}>
                   {error.message}
                </li>
              )
            })
        }
       </ul>
    </div>
  )
}