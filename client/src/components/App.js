import React, { Suspense } from 'react'
import { Route, Switch } from "react-router-dom"
import Auth from "../hoc/auth"
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js"
import LoginPage from "./views/LoginPage/LoginPage.js"
import RegisterPage from "./views/RegisterPage/RegisterPage.js"
import NavBar from "./views/NavBar/NavBar"
import Footer from "./views/Footer/Footer"
import UploadProductPage from "./views/UploadProductPage/UploadProductPage.js"
import DetailProductPage from "./views/DetailProductPage/DetailProductPage.js"

//null   Anyone Can go inside 아무나
//true   only logged in user can go inside 로그인한 유저만
//false  logged in user can't go inside 로그인한 유저는 못감

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          {/* productId는 Dynamic 하게 상품마다 바뀌므로 : 표시 해야됌. */}
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
