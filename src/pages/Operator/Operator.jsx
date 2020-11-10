import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "../../context/userContext";
import { getOperators, updateUser } from "../../services/UsersService";
import Styles from "./Operator.module.scss";
import Modal from "../../components/Modal";
import useModal from "../../components/Modal/useModal";
import SubmitLoad from "./SubmitLoad";
import ReportAProblem from "./ReportAProblem";
import Error from "../../components/Error";

const Operator = () => {
    const { user, vehicle, supervisor } = useContext(UserContext);
    const { isShowing, toggle } = useModal();
    const [isShiftStart, setIsShiftStart] = useState(user.isOnShift);
    const [modalContent, setModalContent] = useState(null);
    const changeStart = user.isOnShift ? "End shift" : "Start shift";

    const updateShiftProperty = () => {
        user.isOnShift = !user.isOnShift;
        setIsShiftStart(user.isOnShift);
        updateUser(user).then(response => localStorage.setItem("user", JSON.stringify(user)));
        getOperators();
    }

    const checklistBarrier = () => {
        if (user.isOnShift && user.assignedVehicle) {
            navigate("/Checklist")
        } else if (!user.isOnShift) {
            let message = "Please begin your shift to accept a vehicle";
            setModalContent(<Error message={message} hide={toggle} />);
            toggle()
        } else {
            let message = "Please confirm with your supervisor that a vehicle is assigned";
            setModalContent(<Error message={message} hide={toggle} />);
            toggle()
        }
    }

    const reportBarrier = () => {
        if (user.isOnShift) {
            toggle();
            setModalContent(<ReportAProblem hide={toggle} />);
        } else {
            let message = "Please begin your shift to report a problem";
            setModalContent(<Error message={message} hide={toggle} />);
            toggle()
        }
    }

    return (
        <main className={Styles.pageGrid}> 
            <button
                className={`${Styles.btn} ${Styles.btnLG}`}
                onClick={() => updateShiftProperty()}>
                    {changeStart}
            </button>
            <button 
                onClick={() => checklistBarrier()} 
                user={user} 
                vehicle={vehicle}
                className={`${Styles.btn} ${Styles.btnLG}`}>
                    Accept Vehicle
            </button>
            
            <button 
                onClick={() => reportBarrier()}
                user={user} 
                className={`${Styles.btn} ${Styles.btnLG}`}>
                    Report a problem
            </button>
            
            <button 
                user={user} 
                className={`${Styles.btn} ${Styles.btnLG}`} 
                onClick= {() => {toggle(); setModalContent(<SubmitLoad hide={toggle} />)}}>
                    Submit Load
            </button>
            <Modal innerComponent={modalContent} isShowing={isShowing} hide={toggle}/>
        </main>
    )
}

export default Operator;