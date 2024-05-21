import { TextInput } from '@mantine/core'
import React from 'react'

const PwdResetReq = () => {
  return (
    <div className=' flex justify-center items-center w-[100vw] h-[100vh] absolute bg-white z-50 left-0 top-0'>
        <form className=' flex justify-center items-center flex-col w-[90%] h-[250px] lg:w-[40%]' style={{border:"1px solid rgba(107, 114, 128, .2)"}}>
            <div className="flex justify-center items-center flex-col">
                <h2 className=' text-2xl font-bold'>LabIS</h2>
                <h3>Send Password Reset Link</h3>
            </div>
            <div className=" flex flex-col gap-[1rem] w-[80%]">
            <TextInput label="Email" withAsterisk placeholder='Enter the email related to this account' />
            <button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Send</button>
            </div>
        </form>
    </div>
  )
}

export default PwdResetReq