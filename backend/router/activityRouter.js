const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//
const Act = require("../models/activity");
//
//process.env.API_KEY

router.post("/createActivity", async (req, res) => {
    try {
        console.log("req.body=>",req.body)
        const {name,activityType,description,hours,minutes,date} = req.body
        //
        await Act.create({
            name,activityType,description,hours,minutes,date
        })
        //
        let activityData = await Act.find().sort({_id:-1})
        //
        res.status(200).json({ msg: "Activity has been created",result:activityData });
    } catch (e) {
        res.status(400).json({ msg: "Error ocurred in creating activity", error: e });
    }
});
//login user by clicking on the button


// reading all registered users
router.get("/readAllActivities", async (req, res) => {
    try {
        let activityData = await Act.find().sort({_id:-1})
        res.status(200).json({ msg: "Activities data has been read",result:activityData });
    } catch (e) {
        res.json({ msg: "error in reading userdata", error: e });
    }
});


// reading all registered users
router.post("/deleteActivity", async (req, res) => {
    const {id} = req.body
    
    try {
        let result = await Act.findByIdAndDelete({_id:id});
        //
        let activityData = await Act.find().sort({_id:-1})
        res.status(200).json({ msg: "Activity data has been deleted",result:activityData });
    } catch (e) {
        res.json({ msg: "error in deleting activity", error: e });
    }
});


// reading all registered users
router.patch("/updateActivity", async (req, res) => {
    console.log("req.body=>",req.body)
    
    try {
        await Act.findByIdAndUpdate({_id:req.body.id},{ $set: req.body},{ new: true });
        //
        let activityData = await Act.find().sort({_id:-1})
        res.status(200).json({ msg: "Activity data has been updated",result:activityData });
    } catch (e) {
        res.json({ msg: "error in updating activity", error: e });
    }
});

module.exports = router;
