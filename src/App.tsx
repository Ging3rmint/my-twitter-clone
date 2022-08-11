import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "screens/Home";
import SideNav from "components/organisms/SideNav";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SideNav />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
