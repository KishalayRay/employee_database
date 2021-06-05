const express = require("express");
const router = express.Router();
const Employee = require("../model/employee");

//Rendering all the employees in home page
router.get("/", (req, res) => {
  Employee.find({}, (error, employees) => {
    if (error) {
      res.status(500).redirect("/");
    } else {
      res.render("index", { employees: employees });
    }
  });
});
//Finding existing employee
router.get("/employee", (req, res) => {
  let searchQuary = { name: req.query.name };
  Employee.findOne(searchQuary, (error, employee) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.render("search", { employee: employee });
    }
  });
});

//Edit employee route
router.get("/edit/:id", (req, res) => {
  let searchQuery = {_id: req.params.id };
  Employee.findOne(searchQuery, (error, employee) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.render("edit", { employee: employee });
    }
  });
});
//Path to new.ejs
router.get("/employee/new", (req, res) => {
  res.render("new");
});

//Path to search.ejs
router.get("/employee/search", (req, res) => {
  res.render("search", { employee: "" });
});
//

//Insert and save new Employee
router.post("/employee/new", (req, res) => {
  let newEmployee = {
    name: req.body.name,
    designation: req.body.designation,
    salary: req.body.salary,
  };

  Employee.create(newEmployee, (error) => {
    if (error) {
      res.status(500).redirect("/");
    } else {
      res.status(201).redirect("/");
    }
  });
});

//Update Employee
router.put("/edit/:id", (req, res) => {
  let searchQuery = { _id: req.params.id };
  Employee.updateOne(
    searchQuery, {$set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary,
      }},
    (error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).redirect("/");
      }
    }
  );
});

//Delete route

router.delete('/delete/:id',(req,res)=>{
  let searchQuery={_id:req.params.id}
  Employee.deleteOne(searchQuery,(error)=>{
    if(error){
      res.status(500).send(error);
    }else{
      req.flash('success_msg','Employee has been deleted');
      res.redirect('/');
    }
  })
})
module.exports = router;
