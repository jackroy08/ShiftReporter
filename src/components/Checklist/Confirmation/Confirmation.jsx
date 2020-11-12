import { Link, navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import Styles from "./Confirmation.module.scss";
import { setVehicleIssues } from "../../../services/VehiclesService";

const Confirmation = (props) => {
    const { vehicle, backHandler, failedElements } = props;
    const [issuesArr, setIssuesArr] = useState([]);

    const getFailedElementJsx = (classType) => {
        return Object.keys(failedElements[classType]).map(elem => {
            if (failedElements[classType][elem].issue) {
                return (
                    <li key={failedElements[classType][elem].issue} className= {Styles.errorItem}>
                        <p>{failedElements[classType][elem].classType}</p>
                        <p>{failedElements[classType][elem].issue}</p>
                        <p>{failedElements[classType][elem].vehicleID}</p>
                        <p>{failedElements[classType][elem].supervisor}</p>
                        <p>{failedElements[classType][elem].operator}</p>
                    </li>
                )
            }
        });
    }

    const submitHandler = () => {
        setVehicleIssues(vehicle.vehicleID, issuesArr, setGoStatusHandler(issuesArr));
        navigate("/operator")
    }

    const setGoStatusHandler = (arr) => {
        let goStatus = "Go";
        if (arr.some(item => item.classType == "classA")) {
            goStatus="No go";
        } else if (arr.some(item => item.classType == "classB")) {
            goStatus="Go, but";
        } else if (arr.some(item => item.classType == "classC")) {
            goStatus="Go";
        }
        return goStatus;
    }

    useEffect(() => {
        const issues = [];
        Object.keys(failedElements).map(classType => {
            Object.keys(failedElements[classType]).map(elem => {
                if (failedElements[classType][elem]["issue"]) {
                    issues.push(failedElements[classType][elem]);
                }
            });
        });
        setIssuesArr(issues);
    }, [])

    return (
        <article className={Styles.errorListTable}>
            <ul className={Styles.errorList}>
                <li className={Styles.columnTitles}>
                    <h4>Class of issue</h4>
                    <h4>Issue</h4>
                    <h4>Vehicle id</h4>
                    <h4>Supervisor</h4>
                    <h4>Operator</h4>
                </li>
                {Object.keys(failedElements).map(getFailedElementJsx)}
            </ul>
            <div className={Styles.navigation}>
                <button onClick={backHandler} className={Styles.btnSecondary}>Back</button>
                <Link to="/operator">
                    <button onClick={submitHandler} className={Styles.btnPrimary}>Confirm checklist</button>
                </Link>
            </div>
        </article>
    )
}

export default Confirmation;