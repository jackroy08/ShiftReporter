import React from "react";
import {Link} from "@reach/router";
import MaintenanceList from "./MaintenanceList";
import MaintenanceAside from "./MaintenanceAside";
import Styles from "./Maintenance.module.scss";

const Maintenance = () => {

    return (
        <main className={Styles.main}>
            <h1 className={Styles.title}>Maintenance</h1>
            <section className={Styles.pageGrid}>
                <MaintenanceList />
            </section>
            <Link to="../MaintenanceAside"><button>Update Maintenence Request</button></Link>
        </main>
    )
}

export default Maintenance;