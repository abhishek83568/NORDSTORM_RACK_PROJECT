import React from "react";
import {  Route, Routes } from "react-router-dom";
import New from "../Pages/New";
import Clearance from "../Pages/Clearance";
import Women from "../Pages/Women";
import Men from "../Pages/Men";
import Kids from "../Pages/Kids";
import Shoes from "../Pages/Shoes";
import BagAccessories from "../Pages/BagAccessories";
import Home from "../Pages/Home";
import Beauty from "../Pages/Beauty";
import GiftGuide from "../Pages/GiftGuide";
import FlashEvents from "../Pages/FlashEvents";
import Navlinks from "./Navlinks";

const Links = () => {
  return (
    <div>
      <Navlinks/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/clearance" element={<Clearance />} />
        <Route path="/women" element={<Women />} />
        <Route path="/Men" element={<Men />} />
        <Route path="/kid" element={<Kids />} />
        <Route path="/shoe" element={<Shoes />} />
        <Route path="/bagaccessories" element={<BagAccessories />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/gift" element={<GiftGuide />} />
        <Route path="/flashEvents" element={<FlashEvents />} />
      </Routes>
      

    </div>
  );
};

export default Links;
