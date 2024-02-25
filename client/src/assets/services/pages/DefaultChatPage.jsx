import Navbar from "../../components/Navbar"
import ChatPages from "./ChatPage"
import SideBarChats from "./SideBarChats"

const DefaultChatPage = () => {
  return (
    <div className="h-screen w-full bg-zinc-900 text-white ">
      <div className=""><Navbar/></div>
      <div className="flex flex-row h-fit bg-zinc-700">
        <div className="w-1/5">
          <SideBarChats />
        </div>
        <ChatPages/>
      </div>
    </div>
  )
}

export default DefaultChatPage