import { navigate } from "@reach/router";
import React, { createContext, useState, useEffect } from "react";
import firebase, { firestore } from "../firebase";
import { getUserVehicle } from "../services/VehiclesService"
import { getTeamSupervisor } from "../services/UsersService"
import { getTeamSiteName } from "../services/TeamsService";

export const UserContext = createContext({});

export const UserProvider = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [supervisor, setSupervisor] = useState({});
    const [vehicle, setVehicle] = useState({});
    const [teamSiteName, setTeamSiteName] = useState({});

    const signUp = (username, password) => {
        let email;
        if (username.match(/@/)){
            email = username;
        } else email = `${username}@shiftreporter.com`;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(response => {
                    firestore
                        .collection("users")
                        .doc(username)
                        .set({
                            authID: response.user.uid
                        }, {merge: true});

                        navigate("/");
                        alert("Sign up successful");
                }).catch(function(error) {
                    alert(error.message)
            });
    }

    const signIn = (username, password) => {
        let email;
        if (username.match(/@/)){
            email = username;
        } else email = `${username}@shiftreporter.com`;


        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(response => {
                    // Save the current user in state
                    firestore
                        .collection("users").where("authID" , "==" , `${response.user.uid}`)
                        .get()
                        .then(response => {
                            response.forEach(doc => {
                                firestore
                                    .collection("users")
                                    .doc(doc.data().userID)
                                    .onSnapshot(doc => {
                                        console.log("snapshot running");
                                        setUser(doc.data());
                                        localStorage.setItem("user", JSON.stringify(doc.data()))
                                    })
                            });
                            navigateToPage();
                        });
                }).catch(function(error) {
                    alert(error.message)
                })
            )
        };

    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                navigate(`/`);
                localStorage.removeItem("user")
                setTimeout(() => setUser(null), 1000);
            })
            .catch((error) => {
                alert(error);
            });
    };

    
    const navigateToPage = () => {
        if (user) {
            navigate(`/${user.userType}`);
            getUserVehicle(user.userID)
                .then(response => {
                    setVehicle(response[0]);
                });
            getTeamSupervisor(user.currentTeam, user.currentSubTeam)
                .then(response => {
                    setSupervisor(response[0])
                });
            getTeamSiteName(user.currentTeam, user.currentSubTeam)
                .then(response => {
                    setTeamSiteName(response[0])
                });
        }
    }
    
    return (
        <UserContext.Provider value={{ user, signUp, signOut, signIn, vehicle, supervisor, teamSiteName }}>
            {props.children}
        </UserContext.Provider>
    );
};
