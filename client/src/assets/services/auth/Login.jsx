import { useState } from "react";
import { NavLink, useNavigate  } from "react-router-dom";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add login logic here
    const { email, password } = loginDetails;
    let user;
    try {
      user = await fetch("http://localhost:5000/api/user/login",{
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let response = await user.json();
      console.log(response);
      let finalres = JSON.stringify(response);
      console.log(finalres);
      localStorage.setItem('userInfo', finalres);
      navigate('/');
    }catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-full flex justify-center ">
      <div className=" w-80 h-full flex flex-col justify-center align-middle items-center gap-3">
        <h1 className=" text-4xl ">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center">
          <input className="border rounded-md p-2 w-full" type="text" name="email" placeholder="Email" value={loginDetails.email} onChange={handleInputChange} />
          <input className="border rounded-md p-2 w-full" type="password" name="password" placeholder="Password" value={loginDetails.password} onChange={handleInputChange} />

          <div className="flex justify-center flex-col w-full items-center">
            <button type="submit" className=" bg-emerald-200 p-2 rounded-sm w-32 ">Login</button>
            <p>Don&apos;t have an account? <NavLink to={'/auth/register'} className="underline italic">Register here</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
