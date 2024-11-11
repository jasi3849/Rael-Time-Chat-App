// import {createContext, useContext,useEffect, useState } from "react";
// import io from "socket.io-client";
// import { AuthContext } from "./AuthContext";
// const SocketContext = createContext();
// export const useSocketContext = () => {
//     return useContext(SocketContext);
// };
// export const SocketProvider = ({ children }) => {
//     const [socket , setSocket] = useState(null);
//     const {authUser,userId} =useContext(AuthContext)
//     useEffect(()=> {
//         if(authUser ){
//             const socket = io("http://192.168.1.9:6000", {
//                 query:{
//                     userId:userId
//                 }
//             })
//             setSocket(socket);

//             return () => socket.close();
//         }else{
//             if(socket){
//                 socket.close()
//                 setSocket(null)
//             }
//         }
//     },[])

//     return(
//         <SocketContext.Provider value={{ socket,setSocket }} >
//             {children}
//         </SocketContext.Provider>
//     )
// }


import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";
const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser, userId } = useContext(AuthContext);
  useEffect(() => {
    if (authUser) {
      const socketInstance = io("http://192.168.1.8:6000", {
        query: { userId: userId },
      });
      setSocket(socketInstance);
      return () => socketInstance.close();
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser, userId]); // Adding `authUser` and `socket` as dependencies
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
// Updated export to match naming in App.js
export { SocketContext, SocketProvider as SocketContextProvider };