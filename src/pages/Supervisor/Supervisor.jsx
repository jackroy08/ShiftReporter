import React, { useState, useEffect } from 'react';
import Styles from './Supervisor.module.scss'
import Load from './Load';
import AssignVehicles from './AssignVehicles';
import { DailyReport } from './DailyReport/DailyReport';
import vehiclesArr from "../../data/vehicles";
import usersArr from "../../data/users";
import VehicleTable from "./VehicleTable";
import UserTable from "./UserTable";
import NewsTicker from "./NewsTicker";
import Modal from "./../../components/Modal";
import useModal from "./../../components/Modal/useModal";

export const Supervisor = () => {

    //get issues API i guess
    const newsItems = [{
        time: "18:34",
        title: "Maintenance",
        message: "Truck 005 Broken Light reported",
        important: false
    },
    {
        time: "18:37",
        title: "Load",
        message: "Truck 041 Loaded",
        important: false
    },
    {
        time: "18:39",
        title: "Load",
        message: "Truck 068 Loaded",
        important: false
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 056 Flat Tyre reported",
        important: true
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 005 Broken Light marked repaired",
        important: false
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 005 Broken Light marked repaired",
        important: false
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 005 Broken Light marked repaired",
        important: false
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 005 Broken Light marked repaired",
        important: false
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 005 Broken Light marked repaired",
        important: false
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 005 Broken Light marked repaired",
        important: false
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 005 Broken Light marked repaired",
        important: false
    },
    {
        time: "18:42",
        title: "Maintenance",
        message: "Truck 005 Broken Light marked repaired",
        important: false
    }];

    const maintenanceIssues = [{status: false},{status: false},{status: false},{status: false},{status: false},{status: false},{status: false},{status: false}]

    const [isOverlayShown, setIsOverlayShown] = useState(false);

    const [overlayContent, setOverlayContent] = useState(null);

    const { isShowing, toggle } = useModal();

    let overlayStyle = isOverlayShown ? Styles.shown : "";

    return (
        <>
            <main className={Styles.pageGrid}>

                <section className={Styles.buttonGrid}>
                    <div><button className={`${Styles.btnPrimary} ${Styles.btn}`} onClick={() => { toggle(); setOverlayContent(<Load toggle={toggle} isShowing={isShowing}/>) }}>Add Load</button></div>
                    <div><button className={`${Styles.btnPrimary} ${Styles.btn}`} onClick={() => { setIsOverlayShown(true); setOverlayContent(<AssignVehicles setIsOverlayShown={setIsOverlayShown} setOverlayContent={setOverlayContent} usersArr={usersArr} vehicleData={vehiclesArr} />) }}>Reassign Vehicles</button></div>
                    <div><button className={`${Styles.btnPrimary} ${Styles.btn}`}>Sign off Maintenance
                    <div className={Styles.notification}>
                        <p>{maintenanceIssues.filter(i=> i.status).length}</p>
                    </div>
                    </button></div>
                    <div><button className={`${Styles.btnPrimary} ${Styles.btn}`}>Check Out Vehicle</button></div>
                    <div><button className={`${Styles.btnPrimary} ${Styles.btn}`} onClick={() => { setIsOverlayShown(true); setOverlayContent(<DailyReport setIsOverlayShown={setIsOverlayShown} setOverlayContent={setOverlayContent} />) }}>Supervisor Reports</button></div>
                </section>
                <section className={Styles.newsTicker}>
                    {<NewsTicker newsItems={newsItems}/>}
                </section>
                <section className={Styles.vehicleTable}>
                    <VehicleTable />
                </section>
                <section className={Styles.vehicleTable}>
                    <UserTable />
                </section>

                <Modal innerComponent={overlayContent} isShowing={isShowing} hide={toggle}/>
                <button onClick={toggle}>click me</button>


            </main>

            <div className={`${Styles.overlay} ${overlayStyle}`}>
                {overlayContent}
            </div>
        </>
    )
}

export default Supervisor;
