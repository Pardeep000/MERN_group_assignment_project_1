import React, { useState ,useEffect} from 'react'
import '../styles/activityBody.css'
import Accordion from './Accordion'
//
import { useSelector, useDispatch } from "react-redux";
import { registerUser, readAllUsers, deleteActivity ,updateActivity} from "../state/reducer/userReducer";
//
export default function ActivityBody() {
    //
    const [actList,setactList] = useState(["Run","Walk","Hiking","Swimming","Bicycle Riding"])
    //
    let actdata = useSelector((e) => e.userdata);
    const dispatch = useDispatch();
    //
    const [userObj,setuserObj] = useState({})
    //
    let handleUpdateActivity = (e) => {
        e.preventDefault()
        let dataArray = {}
        let formdata = new FormData(e.target)
        for (let [key, value] of formdata.entries()) {
            dataArray[key] = value
        }
        //
        dataArray.hours = Number(dataArray.hours)
        dataArray.minutes = Number(dataArray.minutes)
        //
        console.log('dataArray=>', dataArray)
        dispatch(updateActivity(dataArray))
        e.target.reset()
    }
    //
    let handleDelete = (e)=>{
        console.log('clicked delete',e)
        let obj={
            id:e
        }
        dispatch(deleteActivity(obj))
    }
    //
    let handleUpdate = (e)=>{
        console.log("updated clicked=>",e)
        setuserObj(e)
    }
    //
    useEffect(e=>{
        dispatch(readAllUsers())
    },[])
    // actdata.creationArray
    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="container p-2">
                    <div className="row">
                        {actdata.readArray.length===0?<div className='text-center'><h2>No entries</h2></div> :actdata.readArray.map((e,index)=><div key={e._id} className="col-4">
                            <div className="card  mb-3" style={{ width: "20rem", height: "18rem" }}>
                                <div className="card-body text-white" style={{backgroundColor : "#28587a"}}>
                                    <h4 className="card-title text-center"><strong>{e.activityType}</strong></h4>
                                    <div className="card-title mb-2 text-muted border px-2 py-1 d-flex bg-white" style={{ height: "2.25rem",borderRadius:'5px'}}><span className='fw-bold me-2 text-dark'>Name:</span><p>{e.name}</p></div>
                                    <div className="card-title mb-2 text-muted border px-2 py-1 d-flex bg-white" style={{ height: "2.25rem",borderRadius:'5px' }}><span className='fw-bold me-2 text-dark '>Duration:</span><p>{e.hours+" hours"+" "+e.minutes+" minutes"}</p></div>
                                    <div className="card-title mb-2 text-muted border px-2 py-1 d-flex bg-white" style={{ height: "2.25rem",borderRadius:'5px' }}><span className='fw-bold me-2 text-dark '>Date:</span><p>{e.date}</p></div>
                                    {e.description.length <= 25 ? <div className="card-title mb-2 text-muted border px-2 py-1 d-flex bg-white" style={{ height: "2.25rem",borderRadius:'5px'}}><span className='fw-bold me-2  text-dark'>Description:</span>{e.description}</div> : <Accordion data={e.description} index={index} />}
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button data-bs-toggle="modal" data-bs-target="#updateActivity" className='me-2 border-0' onClick={()=>handleUpdate(e)} style={{backgroundColor:"white",fontSize:"1.25rem"}}><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button className='border-0' onClick={()=>handleDelete(e._id)} style={{backgroundColor:"white",fontSize:"1.25rem"}}><i class="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>

                </div>
            </div>
            {/*  */}
            {/* update current Activity Modal */}
            <div className="modal fade" id="updateActivity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update current Activity</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={handleUpdateActivity}>
                            <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label">Name</label>
                                    <input type="text" className="form-control" value={userObj.name} onChange={(e)=>{setuserObj({...userObj,name:e.target.value})}} id="exampleFormControlInput1" name='name' placeholder="2 hours 30 mintutes" />
                                </div>
                                <label>Select exercise activity</label>
                                <select className="form-select" aria-label="Default select example" name="activityType" onChange={(e)=>{setuserObj({...userObj,activityType:e.target.value})}}>
                                    {actList.map(e=>{
                                        if(e===userObj.activityType){
                                            return <option selected>{userObj.activityType}</option>
                                        }
                                        else{
                                            return <option value={e}>{e}</option>
                                        }
                                    })}
                                </select>
                                <label for="date" className="form-label mt-2">Duration:</label><br />
                                <input value={userObj.hours} onChange={(e)=>{setuserObj({...userObj,hours:e.target.value})}} type="number" id="date" name="hours" placeholder='Hours' min="1" max="24" style={{ width: "30%", border: "1px solid lightgrey", borderRadius: "5px", height: '4vh',marginRight:"5px" }} />
                                <input value={userObj.minutes} onChange={(e)=>{setuserObj({...userObj,minutes:e.target.value})}} type="number" id="date" name="minutes" placeholder='Minutes' min="1" max="60" style={{ width: "30%", border: "1px solid lightgrey", borderRadius: "5px", height: '4vh' }} />
                                <br/>
                                <label for="date" className="form-label mt-2">Date:</label><br />
                                <input value={userObj.date} onChange={(e)=>{console.log(typeof userObj.date)}} type="date" id="date" name="date" style={{ width: "100%", border: "1px solid lightgrey", borderRadius: "5px", height: '4vh' }} />
                                <div className="mb-3 mt-2">
                                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea value={userObj.description} onChange={(e)=>{setuserObj({...userObj,description:e.target.value})}} className="form-control" name="description" id="exampleFormControlTextarea1" rows="3" placeholder='Elaborate your activity'/>
                                </div>
                                {/*  */}
                                <input type="hidden" value={userObj._id} name="id"/>
                                {/*  */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">Update Activity</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}