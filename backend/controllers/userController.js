
const CourseModel = require('../models/CourseModel');



module.exports = {

  allUsers: (req, res) => {
    //console.log(req.query)
    CourseModel.find(req.query)
      .lean()
      .then((allUser) => {

        res.json(allUser)
      })
      .catch((err) => {
        res.json("Błąd pobrania użykowników")
      })
  },

  create: (req, res) => {
    let newUser = new CourseModel(req.body);
    newUser.save();
    res.json(newUser)
  },


}