
import { useState } from 'react';
import Routing from './config/routing/routing';
import { UserContextProvider } from './context/UserContext';

const App = () => {
  const [isUser, setIsUser] = useState(false)
  const [todobg, settodobg] = useState(false)
  return (
    <>
    <UserContextProvider value={{isUser,setIsUser,todobg,settodobg}}>
    <Routing/>

    </UserContextProvider>
    </>

  )
}

export default App