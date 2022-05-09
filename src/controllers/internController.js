// const internModel = require("../models/internModel")
// const mongoose = require('mongoose');
// const validEmail = require("email-validator")

// ////////////////////////////////////////////////Create intern////////////////////////////////////////////////////////////////

// const createIntern = async (req, res) => {
//     try {
//         let data = req.body      //data receiving from the request body

//         if(Object.keys(data).length == 0) return res.status(400).send({status: false, Error: "Please fill the data to apply for internship"})
//         if(!data.name) return res.status(400).send({status: false, Error: "Name is Required"})
//         if(!data.email) return res.status(400).send({status: false, Error: "Email is Required"})
//         if(!data.mobile) return res.status(400).send({status: false, Error: "Mobile Number is Required"})
//         if(!data.collegeId) return res.send(400).send({status: false, Error: "CollegeId is Required"})

//         let nameString = /^[A-Za-z\s]+$/
//         if (!nameString.test(data.name)) return res.status(400).send({ status: false, Error: "Name must be in String" })
//         if(!validEmail.validate(data.email)) return res.status(400).send({status: false, Error: "Please Enter a valid Email Id"})
//         let mobileNo = /^[0-9]+$/   //'^[0-9]*$'
//         if(!mobileNo.test(data.mobile)) return res.status(400).send({status: false, Error: "Only Number is Allowed"})
//         if (data.mobile.length !== 10) return res.status(400).send({ status: false, Error: "Mobile number should be of 10 digits excluding (+91)" });
//         //if (!mongoose.isValidObjectId(collegeId)) return res.status(404).send({ status: false, Error: "Enter a valid collegeId" })

//         let getUniqueValues = await internModel.findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });
//         if (getUniqueValues) return res.status(400).send({ status: false, Error: "Email or Mobile number already exist" })


//         let showInternData = await internModel.create(data); 
//         res.status(201).send({status: true,message: "intern created successfully", data: showInternData })   //sending the data in the respond body
//     } catch (err) {
//         res.status(500).send({ status: false, Error: err.message })
//     }
// }

// module.exports.createIntern = createIntern;



const Interns = require("../models/internModel");
const College = require("../models/collageModel");
const { validString, validMobileNum, validEmail } = require('../utils/validation');

const addInterns = async (req, res) => {
  try {
    let data = req.body;

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Enter the details to apply for internships" });

    if (!data.name) return res.status(400).send({ status: false, message: "Name is a required" });
    if (!data.email) return res.status(400).send({ status: false, message: "Email is a required" });
    if (!data.mobile) return res.status(400).send({ status: false, message: "Mobile number is a required" });
    if (!data.collegeName) return res.status(400).send({ status: false, message: "College name is a required" });

    if (validString.test(data.name)) return res.status(400).send({ status: false, message: "Name should be a valid name and should not contain numbers" });
    if (!validEmail.test(data.email)) return res.status(400).send({ status: false, message: "Enter a valid email id" });
    if (!validMobileNum.test(data.mobile)) return res.status(400).send({ status: false, message: "Enter a valid mobile number and it should be of 10 digits" });

    if (validString.test(data.collegeName)) return res.status(400).send({ status: false, message: "Enter a valid college name" });
    let getCllgData = await College.findOne({ name: data.collegeName}).select({ _id: 1 });
    if (!getCllgData) return res.status(404).send({ status: false, message: "Enter a valid college name" });
    data.collegeId = getCllgData._id;

    let getUniqueValues = await Interns.findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });
    if (getUniqueValues) return res.status(400).send({ status: false, message: "Email or Mobile number already exist" })

    let showInterData = await Interns.create(data);
    res.status(201).send({ status: true, message: "Account created successfully", data: showInterData });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
}

module.exports = { addInterns };
