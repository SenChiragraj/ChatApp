import { useMemo, useState } from "react";
import { UserState } from "../../context/UserContext";

const SideBarChats = () => {
  const [friendName, setFriendName] = useState("");
  const { userDetails } = UserState();

  const myFriends = useMemo(() => {}, []);
  myFriends;
  return (
    <div className="p-2">
      <div className="">
        <form action="" className="flex flex-row justify-center align-middle gap-2">
          <input type="text" name="name" value={friendName} onChange={(e) => setFriendName(e.target.value)}
            className="rounded-md border-2 p-2 h-8 text-black" placeholder="Add friend"/>
          <button className="bg-orange-300 text-white font-bold py-1 px-2  rounded-md">Add</button>
        </form>
      </div>
      {
        userDetails.friends?.map()
      }
    </div>
  )
}

export default SideBarChats