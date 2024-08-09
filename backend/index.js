const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Import UUID for generating request IDs
const { isMatch } = require('date-fns');
const {adminMiddleware,updateMiddleware} = require('./middlewares/adminMiddleware');
const userMiddleware = require('./middlewares/userMiddleware');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://0.0.0.0:27017/SMGPS')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  personalNumber: { type: String, unique: true },
  email: { type: String, unique: true },
  designation: String,
  location: String,
  dateOfJoining: { type: Date },
  password: String,
});

const User = mongoose.model('User', userSchema);

const formDataSchema = new mongoose.Schema({
  name: String,
  personalNumber: String,
  sourceLocation: String,
  destinationLocation: String,
  sourceDept: String,
  sourceSubDept: String,
  destinationDept: String,
  destinationSubDept: String,
  materialType: String,
  materialQuantity: Number,
  unitOfMeasure: String,
  purpose: String,
  remarks: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'Pending' }, // Add status field
  timestamp: { type: Date, default: Date.now },
  requestID: { type: String, unique: true, default: uuidv4 },
});

const FormData = mongoose.model('FormData', formDataSchema);

const Adminschema = new mongoose.Schema({
  personalNumber: { type: String, unique: true },
  designation: String,
  password: String,
});

const Admin = mongoose.model("Admin",Adminschema);

app.post('/api/signup', async (req, res) => {
  const { name, personalNumber, email, password, designation, location, dateOfJoining } = req.body;
  console.log('Received signup request:', req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      personalNumber,
      email,
      password: hashedPassword,
      designation,
      location,
      dateOfJoining: new Date(dateOfJoining)
    });
    await newUser.save();
    res.status(200).json({ message: 'User signed up successfully' });
  } catch (err) {
    console.error('Error signing up user:', err);
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { personalNumber, password } = req.body;
  try {
    const user = await User.findOne({ personalNumber });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ personalNumber: user.personalNumber, designation: user.designation }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/form', async (req, res) => {
  const formData = new FormData({
    ...req.body,
    requestID: uuidv4() // Generate a unique requestID
  });
  console.log('Received form submission:', req.body);
  try {
    await formData.save();
    res.status(200).json({ message: 'Form data saved successfully', requestID: formData.requestID });
  } catch (err) {
    console.error('Error saving form data:', err);
    res.status(400).json({ error: err.message });
  }
});

app.get('/user/formdata',userMiddleware,async(req,res)=>{
  const personalNumber = req.user.personalNumber;

  try{
const formdata = await FormData.findOne({personalNumber:personalNumber});
if(formdata){
  return res.status(200).json({formdata});
}else{
  return res.status(403).json({"msg":"formdata not found"});
}
  }catch(err){
    return res.status(404).json({"msg":"some error occured"});
  }
})


app.post("/admin/login", async (req, res) => {
  const { personalNumber, password } = req.body;

  try {
    const admin = await Admin.findOne({ personalNumber });

    if (!admin) {
      return res.status(400).json({ error: 'Admin not found' });
    }

    if (admin.designation !== 'Admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    if (password !== admin.password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', personalNumber: admin.personalNumber, designation: admin.designation });
  } catch (err) {
    console.error('Error logging in admin:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/admin/formdata',async (req,res)=>{
  try{
    const userdata = await FormData.find();
    if(userdata){
     return res.status(200).json({userdata});
    } 
  }catch(err){
    return res.status(404).json({"msg":"some error occured"});
  }
})

app.patch('/admin/update/:personalNumber',adminMiddleware,updateMiddleware,async(req,res)=>{
  try{
    const designation = req.admin.designation;
    const personalNumber = req.params.personalNumber;
    const status = req.status;

    if(designation !== "manager"){
      return res.status(403).json({"msg":"not authorized"});
    }

    const userForm = await FormData.findOne({personalNumber:personalNumber});
  
    if(userForm){
     await FormData.updateOne(
        { personalNumber: personalNumber }, 
        { $set: { status: status } }
      );
      return res.status(200).json({"msg":"status code updated"});
    }else{
      return res.status(404).json({"msg":"user does not found"});
    }
  }catch(err){
   return res.status(404).json({"msg":"some error occured"});
  }
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

