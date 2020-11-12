import React, { useEffect, useState } from "react"
import { Router } from "@reach/router"
import Styles from "./Admin.module.scss";
import { Link } from "@reach/router";
import ManageUsers from './ManageUsers'
import ManageVehicles from "./ManageVehicles";
import ManageTeams from './ManageTeams'
import ManageSites from './ManageSites'
import ManageParts from './ManageParts'
import SideNav from '../../components/SideNav'
import ManageChecklists from "./ManageChecklists";
import { firestore } from "../../firebase";


const Admin = () => {

    // handle keyword here puuulease :)
    const handleExport = async () => {
        const totalData = {};

        // 1. List out the names of the collections we want to query/get
        const collectionNames = ["archivedLoads", "loads", "newsItems", "parts", "sites", "teams", "users", "vehicles"];

        // 2. Build up an array of promises to get the data from each of these collections
        const promises = collectionNames.map(collectionName => firestore.collection(collectionName).get());

        // 3. Combine them and only resolve when ALL of the promises are resolved
        Promise.all(promises).then((response) => {
            // Foreach collection we need store the collection in our totalData Object
            response.forEach((collection,i) => {
                // 3.1 Get the collection name to serve as our key
                const collectionName = collectionNames[i];
                // 3.2 Intialize the key/value pair in our totalData object
                totalData[collectionName] = {};
                // 3.3 Loop through our docs and add them as the values
                collection.docs.forEach(doc => {
                    totalData[collectionName][doc.id] = doc.data()
                })
            })

            // 4. Pass the data to download to download! :)
            handleDownload(totalData);
        })
    }

    const handleDownload = (content) => {
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(content)], { type: "application/json" });
        a.href = URL.createObjectURL(file);
        a.download = `shiftreporter-export-${new Date().toLocaleString()}-data`;
        a.click();  
    }

    return (
        <div className={Styles.pageContainer}> 
            <SideNav>
                <h2>Admin</h2>
                <Link to="ManageUsers"><button className={Styles.btnNav}> - Manage Users</button></Link>
                <Link to="ManageVehicles"><button className={Styles.btnNav}> -  Manage Vehicles</button></Link>
                <Link to="ManageTeams"><button className={Styles.btnNav}> -  Manage Teams</button></Link>
                <Link to="ManageSites"><button className={Styles.btnNav}> - Manage Sites</button></Link>
                <Link to="ManageParts"><button className={Styles.btnNav}> - Manage Parts</button></Link>
                <Link to="ManageChecklists"><button className={Styles.btnNav}> - Manage Checklists</button></Link>
                <button className={Styles.btnNav} onClick={handleExport}>Export firestore data</button>
            </SideNav>
            <main className={Styles.pageContainer}>
                <Router style={{width: "100%"}}>
                    <ManageUsers default path="ManagerUsers"/>
                    <ManageVehicles path="ManageVehicles" />
                    <ManageTeams path="ManageTeams"/>
                    <ManageSites path="ManageSites"/>
                    <ManageParts path="ManageParts"/>
                    <ManageChecklists path="ManageChecklists" />
                </Router>
            </main>
        </div>
    )
}

export default Admin;