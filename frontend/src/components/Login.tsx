import axios from "axios";
import { Navigate } from "react-router-dom";
import { FormEventHandler, useState } from "react";
import GoogleLogin from "react-google-login";


export const Login = () => {
  // const clientId =
  //   "676246280208-ulhmdscj2ndbe5k6qo6v5pj5pelep5a0.apps.googleusercontent.com";

  // const onSuccess = async (res: any) => {
  //   console.log("succzddgsfgess:", res.accessToken);
  //   const user = {
  //     grant_type: "convert_token",
  //     client_id: clientId,
  //     client_secret: "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",
  //     backend: "google-oauth2",
  //     token: res.accessToken,
  //   };
  //   //console.log(user)
  //   const { data } = await axios.post(
  //     "http://localhost:8000/user/oauth2/convert-token/",
  //     user,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   //console.log(data, data['access_token'])
  //   axios.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${data["access_token"]}`;
  //   localStorage.clear();
  //   localStorage.setItem("access_token", data.access_token);
  //   localStorage.setItem("refresh_token", data.refresh_token);
  //   window.location.href = "/";
  // };

  // const onFailure = (err: any) => {
  //   console.log("failed:", err);
  // };

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onFormSubmit = async (event:any) => {
    event.preventDefault()
    const {data} = await axios.post("http://127.0.0.1:8000/user/login/", {email:email, password:password})
    console.log(data, data["tokens"]["access_token"])
    localStorage.clear()
    localStorage.setItem("access_token_f", data["tokens"]["access_token"])
    window.location.href = "/"
  }
  

  const emailChange = (e:any)=>{
    e.preventDefault()
    setEmail(e.target.value)
  }

  const passwordChange = (e:any)=>{
    e.preventDefault()
    setPassword(e.target.value)
  }

  return (
    <div className=" flex justify-center items-center flex-col w-[100vw] h-[100vh] absolute bg-white z-50 left-0 top-0">
      <h2>Sign In</h2>
      <div className="w-[30vw] flex flex-col gap-[2rem]">
        {/* <GoogleLogin
          // clientId={clientId}
          buttonText="Sign in with Google"
          // onSuccess={onSuccess}
          // onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          className=" w-[70%] m-auto text-center"
        /> */}
        <form onSubmit={onFormSubmit} className=" w-[90%] flex flex-col gap-[2rem]">
          <div className="w-[88%] m-auto">
            <label htmlFor="email" >Email:</label>
            <input className=" focus:border-none focus:outline-none" type="email" name="email" id="" style={{border:"2px solid rgba(37, 99, 235, 0.2)"}} onChange={emailChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="" className="focus:border-none focus:outline-none" style={{border:"2px solid rgba(37, 99, 235, 0.2)"}} onChange={passwordChange}/>
          </div>
          <button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Login</button>
        </form>
      </div>
    </div>
  );
};
