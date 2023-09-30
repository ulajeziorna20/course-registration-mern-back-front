
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


  delete: (req, res) => {
    CourseModel.findByIdAndDelete(req.params.id).then(() => {

      res.json({ deleted: true })
    })
      .catch((err) => {
        res.send("Błąd usuwania uzytkownika");
      }
      )
  },

  update: (req, res) => {
    CourseModel.findByIdAndUpdate(req.params.id, req.body).then((updateUser) => {
      res.json(updateUser);

    })
      .catch((err) => {
        res.send("Błąd aktualizacji");
      })
  },

  filtrNameUp: (req, res) => {
    //console.log(req.query)
    CourseModel.find(req.query).sort({ "name": 1 })
      .lean()
      .then((filtrNameUp) => {
        res.json(filtrNameUp)
      })
      .catch((err) => {
        res.send("Błąd pobrania użykowników");
      })
  },


  filtrNameDown: (req, res) => {
    //console.log(req.query)
    CourseModel.find(req.query).sort({ "name": -1 })
      .lean()
      .then((filtrNameDown) => {
        res.json(filtrNameDown)
      })
      .catch((err) => {
        res.send("Błąd pobrania użykowników");
      })
  },


  filtrCityUp: (req, res) => {
    //console.log(req.query)
    CourseModel.find(req.query).sort({ "city": 1 })
      .lean()
      .then((filtrCityUp) => {
        res.json(filtrCityUp)
      })
      .catch((err) => {
        res.send("Błąd pobrania użykowników");
      })

  },



  filtrCityDown: (req, res) => {
    //console.log(req.query)
    CourseModel.find(req.query).sort({ "city": -1 })
      .lean()
      .then((filtrCityDown) => {
        res.json(filtrCityDown)
      })
      .catch((err) => {
        res.send("Błąd pobrania użykowników");
      })

  },


  filtrCourseUp: (req, res) => {
    //console.log(req.query)
    CourseModel.find(req.query).sort({ "course": 1 })
      .lean()
      .then((filtrCourseUp) => {
        res.json(filtrCourseUp)
      })
      .catch((err) => {
        res.send("Błąd pobrania użykowników");
      })
  },


  filtrCourseDown: (req, res) => {
    //console.log(req.query)
    CourseModel.find(req.query).sort({ "course": -1 })
      .lean()
      .then((filtrCourseDown) => {
        res.json(filtrCourseDown)
      })
      .catch((err) => {
        res.send("Błąd pobrania użykowników");
      })
  },


}