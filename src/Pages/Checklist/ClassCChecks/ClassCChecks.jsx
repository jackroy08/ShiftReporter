import React from "react";
import { Link } from "@reach/router";
import styles from "../Checklist.module.scss";

const ClassCChecks = (props) => {
    const checkboxArr = props.checklistData;
    const getCheckList = item => (
        <label key={item} htmlFor={item}>{item}
            <input type="checkbox" id={item} name={item} value={item}/>
        </label>
    );
    return (
        <section>
            <h1>Class C Checks</h1>
            <form id="class-c-checks"> 
                {checkboxArr.map(getCheckList)}
            </form>
            <textarea name="class-c-comment" id="class-c-checks"></textarea>
            <section className={styles.navigation}>
                <Link to="/classb">
                    <button className={styles.navButtons}>Back</button> 
                </Link>
                <Link to="/confirmation">
                    <button className={styles.navButtons}>Next</button>
                </Link>
            </section>
        </section>
    )
}

export default ClassCChecks;