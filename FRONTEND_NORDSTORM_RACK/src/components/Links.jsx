import React from "react";
import { Route, Routes } from "react-router-dom";
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
import Register from "../Pages/Register";
import PrivateRoute from "../BrowserRouter/PrivateRoute";
import Cart from "../Pages/Cart";
import SearchProducts from "../Pages/SearchProducts";

const Links = () => {
  return (
    <div>
      <Navlinks />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route
          path="/clearance/:id"
          element={
            <PrivateRoute>
              <Clearance />
            </PrivateRoute>
          }
        />
        <Route path="/women" element={<Women />} />
        <Route path="/Men" element={<Men />} />
        <Route path="/kid" element={<Kids />} />
        <Route path="/shoe" element={<Shoes />} />
        <Route path="/bagaccessories" element={<BagAccessories />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/gift" element={<GiftGuide />} />
        <Route path="/flashEvents" element={<FlashEvents />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchProducts />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Links;
