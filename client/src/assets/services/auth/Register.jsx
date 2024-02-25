import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    name: '',
    password: '',
    email: '',
    pic: '',
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registerDetails);
    const { email, password, name, pic } = registerDetails;
    let user;

    try {
      user = await fetch("http://localhost:5000/api/user/register",{
        method: "POST",
        body: JSON.stringify({email, password, name, pic}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      user =  await user.json();
      // console.log(user);
      localStorage.setItem('userInfo', JSON.stringify(user));
      navigate('/');
    }catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-full flex justify-center ">
      <div className=" w-80 flex flex-col justify-center align-middle items-center gap-3">
        <h1 className=" text-4xl ">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center">
          <input className="border rounded-md p-2 w-full" type="text" name="name" placeholder="Name" value={registerDetails.name} onChange={handleInputChange} />
          <input className="border rounded-md p-2 w-full" type="text" name="email" placeholder="Email" value={registerDetails.email} onChange={handleInputChange} />
          <input className="border rounded-md p-2 w-full" type="password" name="password" placeholder="Password" value={registerDetails.password} onChange={handleInputChange} />
          <input className="border rounded-md p-2 w-full" type="text" name="pic" placeholder="Avator" value={registerDetails.pic} onChange={handleInputChange} />

          <div className="flex justify-center flex-col w-full items-center">
            <button type="submit" className=" bg-emerald-200 p-2 rounded-sm w-32 ">Register</button>
            <p>Already have an account? <NavLink to={'/auth/login'} className="underline italic">Login here</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register