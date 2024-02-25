import { UserState } from "../context/UserContext"

const Navbar = () => {

  const { userDetails } = UserState();

  return (
    <div>{userDetails.name}</div>
  )
}

export default Navbar