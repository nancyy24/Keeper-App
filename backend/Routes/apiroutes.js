const express = require("express");
const router = express.Router();
const Keeper = require("../modals/modal")


router.get("/api/getAll", (request, response) => {
    Keeper.find({}, (err, keeperList) => {
        if(err){
            console.log(err)
        } else {
            response.status(200).send(keeperList)
        }
    })
})

router.post("/api/addNew", (request, response) => {
    const { title, description } = request.body
    const keeperObj = new Keeper({
        title,
        description
    })
    keeperObj.save( err => {
        if(err){
            console.log(err)
        }
        Keeper.find({}, (err, keeperList) => {
            if(err){
                console.log(err)
            } else {
                response.status(200).send(keeperList)
            }
        })
    })

})

router.post("/api/delete", (request, response) => {
    const { id } = request.body
    Keeper.deleteOne({ _id: id}, () => {
        Keeper.find({}, (err, keeperList) => {
            if(err){
                console.log(err)
            } else {
                response.status(200).send(keeperList)
            }
        })
    })

})


module.exports=router;
