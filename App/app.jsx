import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
// import RouterLink from "./Routers/Router";
const { PUBLIC_URL } = process.env;

const App = () => {

  return (
    <>
      {/**
      <ConnectionToast
        timeout={1500}
        onlineText="Conneted Online"
        offlineText="Check your connection and try again."
      />
       */}
      <BrowserRouter basename={PUBLIC_URL || ""}>
        <Route component={Layout} />
        {/* <Route element={<RouterLink />} /> */}
      </BrowserRouter>
    </>
  );
};

export default App;
