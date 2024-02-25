import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom";
import {io} from 'socket.io-client'

const ChatBox = () => {
  const { room } = useParams();
  console.log(room)
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState([{flag : Boolean, text : String}]);
  // const [, setSentMessage] = useState([""]);
  // const [room, setRoom] = useState('');
  // const [roomToSendMessage, setRoomToSendMessage] = useState('');
  const [socketID, setSocketID] = useState('');

  const socket = useMemo(() => io('http://localhost:5000'), [])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    const newText = { flag: false, text: message };
    setSentMessage((prev) => [...prev, newText]);
    setMessage("");
  };

  // const joinRoom = (e) => {
  //   e.preventDefault();
  // socket.emit("join-room", room);
  //   setRoom("");
  // };

  useEffect(() => {

    socket.emit("join-room", room);

    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      const newText = { flag: true, text: data };
      setSentMessage((prev) => [...prev, newText]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
        {socketID ? <h1>{socketID}</h1> : <></>}

        {/* <form action="" onSubmit={joinRoom}>
          <input type="text" placeholder="Enter room name" value={room} onChange={(e) => setRoom(e.target.value)} />
          <button type="submit">Join</button>
        </form> */}

        <form action="" onSubmit={handleSubmit}>
          {/* <input type="text" placeholder="Enter room to send" value={roomToSendMessage} onChange={(e) => setRoomToSendMessage(e.target.value)} /> */}
          <input
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={
              (e) => {
                setMessage(e.target.value);

              }} />
          <button type="submit">Send</button>
        </form>
        {
          sentMessage.map((m, i) => {
            return <div key={i} className="flex flex-col w-64 h-45 bg-gray-100">
              <p className={m.flag ? ' text-orange-600 w-full flex justify-start ' : 'w-full flex text-green-700 justify-end'}>{ m.text}</p>
            </div>;
          })
        }
      </div>
  )
}

export default ChatBox