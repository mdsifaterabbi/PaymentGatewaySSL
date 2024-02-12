import React, { createContext, useState, useContext } from "react";

const MyContextObj = createContext(); //creating context object named as MyContextObj

const MyContextProvider = ({ children }) => {
  const [result, setResult] = useState({}); // Manage the context value using state

  return (
    <MyContextObj.Provider value={[result, setResult]}>
      {children}
    </MyContextObj.Provider>
  );
};

//custom hook
const useMyContext = () => useContext(MyContextObj);

export { useMyContext, MyContextProvider };
