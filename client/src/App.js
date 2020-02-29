import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/admin/auth/login";
import Dashboard from "./components/admin/dashboard/dashboard";
import User from "./components/admin/user/user";
import Admin from "./components/admin/admin/admin";
import FetaAdmin from "./components/FetaAdmin/admin";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadAdmin } from "./actions/admin/auth";
import { loadUser } from "./actions/user/auth";
import setAdminAuthToken from "./utils/setAdminAuthToken";
import setUserAuthToken from "./utils/setUserAuthToken";

import Categories from "./components/admin/manage_products/categories/categories";
import SubCategories from "./components/admin/manage_products/subCategories/subCategories";
import Brands from "./components/admin/manage_products/Brands/Brands";
import Products from "./components/admin/manage_products/Products/Products";
import Modal from "./components/admin/layouts/modal";
import Company from "./components/admin/manage_products/company/company";
import Region from "./components/admin/manage_location/regions/region";
import Area from "./components/admin/manage_location/areas/area";
import Territory from "./components/admin/manage_location/territories/territory";
import LocationRoute from "./components/admin/manage_location/routes/route";
import Outlet from "./components/admin/manage_location/outlets/outlet";
import Country from "./components/admin/manage_location/country/country";
import Role from "./components/admin/role/role";
import Designation from "./components/admin/designation/designation";
import Home from "./components/Home";
import UserLogin from "./components/user/auth/Login";
import UserRegister from "./components/user/auth/Register";
import ForgetPassword from "./components/user/auth/ForgetPassword";
import AdminForgetPassword from "./components/admin/auth/ForgetPassword";
import UserDashboard from "./components/user/dashboard/dashboard";
import UserOutlet from "./components/user/outlet/outlet";
import SosTarget from "./components/admin/manage_target/sos_target/sos";
import MslTarget from "./components/admin/manage_target/msl_target/msl";
import VisitTarget from "./components/admin/manage_target/visit_target/visit";
import SubmissionTarget from "./components/admin/manage_target/submission_target/submission";
import FeedbackSubject from "./components/admin/manage_feedback/subject/feedbackSubject";
import UserFeedbacks from "./components/user/feedback/feedbacks";
import Feedbacks from "./components/admin/manage_feedback/feedback/feedback";
import UserSubmission from "./components/user/submission/submission";
import UserAccount from "./components/user/account/account";
import UserRoutes from "./components/user/account/routes";
import EditProfile from "./components/user/account/editProfile";
import "antd/dist/antd.css";
//css
import "./main.css";

if (localStorage.token) {
  setAdminAuthToken(localStorage.token);
}

if (localStorage.userToken) {
  setUserAuthToken(localStorage.userToken);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadAdmin());
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={UserLogin} />
          <Route exact path="/register" component={UserRegister} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route
            exact
            path="/admin/forget-password"
            component={AdminForgetPassword}
          />
          <Route exact path="/admin/login" component={Login} />
          <Switch>
            <Route exact path="/dashboard" component={UserDashboard} />
            <Route exact path="/user/outlets" component={UserOutlet} />
            <Route exact path="/user/feedbacks" component={UserFeedbacks} />
            <Route exact path="/user/submissions" component={UserSubmission} />
            <Route exact path="/user/account" component={UserAccount} />
            <Route exact path="/user/routes" component={UserRoutes} />
            <Route exact path="/user/edit-profile" component={EditProfile} />
            <Route exact path="/admin" component={Dashboard} />
            <Route exact path="/admin/users" component={User} />
            <Route exact path="/admin/admins" component={Admin} />
            <Route exact path="/admins" component={FetaAdmin} />
            <Route
              exact
              path="/admin/product/categories"
              component={Categories}
            />
            <Route
              exact
              path="/admin/product/sub-categories"
              component={SubCategories}
            />
            <Route exact path="/admin/product/brands" component={Brands} />
            <Route exact path="/admin/product/company" component={Company} />
            <Route exact path="/admin/products" component={Products} />
            <Route exact path="/admin/regions" component={Region} />
            <Route exact path="/admin/areas" component={Area} />
            <Route exact path="/admin/territories" component={Territory} />
            <Route exact path="/admin/routes" component={LocationRoute} />
            <Route exact path="/admin/outlets" component={Outlet} />
            <Route exact path="/admin/countries" component={Country} />
            <Route exact path="/admin/roles" component={Role} />
            <Route exact path="/admin/designations" component={Designation} />
            <Route exact path="/admin/sos-target" component={SosTarget} />
            <Route exact path="/admin/msl-target" component={MslTarget} />
            <Route exact path="/admin/visit-target" component={VisitTarget} />
            <Route
              exact
              path="/admin/submission-target"
              component={SubmissionTarget}
            />
            <Route
              exact
              path="/admin/feedback-subject"
              component={FeedbackSubject}
            />
            <Route exact path="/admin/feedbacks" component={Feedbacks} />
            <Route exact path="/admin/modal" component={Modal} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
