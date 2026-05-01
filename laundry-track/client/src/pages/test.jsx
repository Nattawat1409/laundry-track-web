import React, { use , useState, useEffect  } from 'react';
import axios from 'axios';
 
function Test() {

    const URL = "http://localhost:3000/test";
    const [error,setError] = useState("");
    //create important data for "Form field"
    const [form,setForm] = useState({
        fullName:"",
        email:"",
        password:"",
        confirmPassword: ""
    });

    console.log(form);

    // copy all value from input data within form 
    const handleInput = (e)=>{
        setForm({
            // copy all data according to input by user 
            ...form,
            [e.target.name] : e.target.value
        });
    };

    //function when click submit button send data to API 
    //when e = event
    const handleSubmit = async (e)=> {
        e.preventDefault();

        try{
            const res = await axios.post(URL,form);
            console.log(res.data);   
        }catch(err){
            console.log(err);
        }
    }



    return (


        <div className='flex flex-col m-100 bg-slate-100 w-100 p-5'>
            <h1 className='text-5xl pb-4 text-center font-sans font-medium'>Register Form</h1>
            
            <form onSubmit={handleSubmit} >
            <input name="fullName" placeholder="Full Name" onChange={handleInput} className='h-14 w-full' />
            <input name="email" placeholder="Email" onChange={handleInput} className='h-14 w-full'/>
            <input name="password" type='password' placeholder="Password" onChange={handleInput} className='h-14 w-full'/>
            <input name="confirmPassword" type='password' placeholder="Password" onChange={handleInput} className='h-14 w-full'/>

            <button type="submit" className='bg-blue-900 text-slate-50 px-3 py-3 h-14 w-full rounded-lg'>Register</button>
            </form>
        </div>
    );
}

export default Test;