// const express = require('express');
// const router = express.Router();

// const collageCont= require("../controllers/collageController")
// const internCont = require("../controllers/internController")



// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })


// router.post("/functionup/colleges",  collageCont.createCollage)

// router.post("/functionup/interns",  internCont.createIntern)

// //router.get("/collegeDetails", internCont.getDetails)

// router.get("/functionup/collegeDetails", collageCont.collegeDetails)



// module.exports = router;



const express = require('express');
const { addInterns } = require("../controllers/internController");
const { createCollege, collegeDetails } = require("../controllers/collageController")

const router = express.Router();

router.post("/functionup/colleges", createCollege)
router.post('/functionup/interns', addInterns);
router.get('/functionup/collegeDetails', collegeDetails);

module.exports = router;