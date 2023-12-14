const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];


function validateCourse(course){
    const courseSchema = Joi.object({
        name: Joi.string().min(3).required(),
      });
   return courseSchema.validate(course)      
}


// update the course
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(cour => cour.id === parseInt(req.params.id))
    if(!course)
    return res.status(404).send(`The course for given ID ${req.params.id} is not available`)
    
    const {error} = validateCourse(req.body)
    if(error)
    return res.status(400).send(error.details[0].message)
    
    course.name = req.body.name
    res.send(course)
})


// delete the course
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(cour => cour.id === parseInt(req.params.id))
    if(!course)
    return res.status(404).send(`The course for given ID ${req.params.id} is not available`)
    
     const index = courses.indexOf(course)
     courses.splice(index,1);
     res.send(course)

})


// insert the course
app.post("/api/course", (req, res) => {
  const { error } = validateCourse(req.body)

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world !!!</h1>");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// get the course
app.get("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res
      .status(404)
      .send(`The course for given ID ${req.params.id} is not available`);
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

const port = process.env.port || 3001;

app.listen(port, () => {
  console.log(`Listen in port ${port}`);
});
