// const mongoose = require('mongoose');
// //const ObjectId = mongoose.Schema.Types.ObjectId

// const collageSchema = new mongoose.Schema( {
//     name: {
//         type: String,
//         unique: true,
//         required: 'Please enter a name'
//     }, 
//     fullName: {
//         type: String,
//         required: 'Please enter a fullname'
//     }, 
//     logoLink: {
//         type: String,
//         required: 'please link a logolink'
//     },
//     // interests: {
//     //     type: ObjectId,
//     //     ref: "intern"
//     // },
    
//     isDeleted: {
//         type: Boolean,
//         default: false
//     },
// }, { timestamps: true });


// module.exports = mongoose.model('collage', collageSchema)






const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "name is required",
        unique: true,
        trim:true
    },

    fullName: {
        type: String,
        required: "fullName is required",
        trim:true
    },

    logoLink: {
        type: String,
        required: "logoLink is required",
        trim:true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model("College", collegeSchema); //colleges
