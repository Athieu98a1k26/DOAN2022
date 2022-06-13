import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOptions } from "./actions/app";
import PrinterApi from "./api/admin/option";
// import User from './lib/user';
const OptionContext = createContext();

export const OptionProvider = ({ children }) => {
  const [option, setOptions] = useState();
  const dispatch = useDispatch();
  const optionSetup = useSelector((state) => state.app.options);
  useEffect(() => {
    // dispatch(getOptions());
    // user: new User(this.props.account, this.redirect),
  }, []);
  useEffect(() => {
    setOptions(optionSetup);
  }, [optionSetup]);

  const toggleMenu = () => {
    setOptions(!option);
  };
  return (
    <OptionContext.Provider
      value={{
        option,
        // toggleMenu
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export default OptionContext;
