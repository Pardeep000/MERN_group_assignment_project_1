import React, { useEffect, useState } from 'react'
import '../styles/NavbarStyle.css';
//
import { useSelector, useDispatch } from "react-redux";
import {registerUser,readAllUsers } from "../state/reducer/userReducer";
//
export default function Navbar() {
    //
    let userstatus = useSelector((e) => e.userdata);
    const dispatch = useDispatch();
    //
    const [usersList, setUsersList] = useState([])
    //
    let handleRegisterUser = (e) => {
        e.preventDefault()
        let dataArray = {}
        let formdata = new FormData(e.target)
        for (let [key, value] of formdata.entries()) {
            dataArray[key] = value
        }
        //
        console.log('dataArray=>', dataArray)
        dispatch(registerUser(dataArray));
        e.target.reset()
    }
    //
    let handleFilter = () => {
        console.log('clicked users')
    }
    //
    return (
        <>
            <div className="Navbar p-" style={{backgroundColor : "#28587a"}}>
                <button type="button" className="btn border-white text-white" data-bs-toggle="modal" style={{backgroundColor : "#28587a"}} data-bs-target="#registerUser">Create new Activity <i className="fa-solid fa-circle-plus"></i></button>
                <div className="text-light px-5"><h2>Exercise Tracker App</h2></div>
                <div className="dropdown">
                    <button onClick={handleFilter} className="btn btn-dark border-white dropdown-toggle text-white" style={{backgroundColor : "#28587a"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        All Activities
                    </button>
                    <ul className="dropdown-menu text-white" style={{backgroundColor : "#28587a"}}>
                        <div className="text-center px-2 py-0"><li>user 1</li></div>
                        <div className="text-center px-2 py-0"><li>user 2</li></div>
                        <div className="text-center px-2 py-0"><li>user 3</li></div>
                    </ul>
                </div>
            </div>
            {/* register user modal */}
            <div className="modal fade" id="registerUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Register User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={handleRegisterUser}>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" name='name' placeholder="Steven Smith" />
                                </div>
                                <label>Select exercise activity</label>
                                <select className="form-select" aria-label="Default select example" name="activityType">
                                    <option selected>Run</option>
                                    <option value="Walk">Walk</option>
                                    <option value="Hiking">Hiking</option>
                                    <option value="Swimming">Swimming</option>
                                    <option value="Bicycle Riding">Bicycle Riding</option>
                                </select>
                                {/*  */}
                                <label for="date" className="form-label mt-2">Date:</label><br />
                                <input type="date" id="date" name="date" style={{ width: "100%", border: "1px solid lightgrey", borderRadius: "5px", height: '4vh' }} />
                                {/*  */}
                                <label for="date" className="form-label mt-2">Duration:</label><br />
                                <input type="number" id="date" name="hours" placeholder='Hours' min="1" max="24" style={{ width: "30%", border: "1px solid lightgrey", borderRadius: "5px", height: '4vh',marginRight:"5px" }} />
                                <input type="number" id="date" name="minutes" placeholder='Minutes' min="1" max="60" style={{ width: "30%", border: "1px solid lightgrey", borderRadius: "5px", height: '4vh' }} />
                                {/*  */}
                                <div className="mb-3 mt-2">
                                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows="3" placeholder='Elaborate your activity'/>
                                </div>
                                {/*  */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">Create activity</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
