import React from "react";
import {Router} from "@reach/router"
import styles from "./App.module.scss";
// Pages for Router
import Login from "./pages/Login";
import Operator from "./pages/Operator";
import Supervisor from "./pages/Supervisor";
import Maintenance from "./pages/Maintenance";
import Management from "./pages/Management";
import Admin from "./pages/Admin";
import Checklist from "./components/Checklist";
import SubmitLoad from "./pages/Operator/SubmitLoad";
import ReportAProblem from "./pages/Operator/ReportAProblem/ReportAProblem";
import PrivateRoute from "./routes/PrivateRoute";
import MaintenanceReport from "./pages/Maintenance/MaintenanceReport";
// Components
import Header from './components/header';
// Data
import checklistData from "./data/checklistdata.js";
import library from "./data/fa-library";
//Providers
import { UserProvider } from "./context/userContext";
import { setVehicleIssues } from "./services/VehiclesService";



const App = () => {

  return (
    <>
    <UserProvider>
        <Header />
        <Router className={styles.fullWidth}>
          <Login path="/" />
          <PrivateRoute path="/">
            <Operator path="/operator/*" />
            <Supervisor path="/supervisor" />    
            <Maintenance path="/maintenance" />
            <MaintenanceReport path="/maintenance-report" />
            <Management path="/management/*" />
            <Admin path="/admin/*" />
            <Checklist path="/Checklist" checklistData={checklistData} />
            <SubmitLoad path="/SubmitLoad" />
            <ReportAProblem path="/ReportAProblem" />
          </PrivateRoute>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
