// index.js
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => {
    console.log('Connected to MongoDB');
   
    initializeEmailCount();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
 

// Schema for form data
const formSchema = new mongoose.Schema({
  uid:{
    type: String,
    required: true,
    unique: true,
    
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },


});

const Form = mongoose.model('Form', formSchema);

// Schema for email count
const emailCountSchema = new mongoose.Schema({
  count: { type: Number, default: 0 }
});

const EmailCount = mongoose.model('EmailCount', emailCountSchema);

// Initialize email count in the database
async function initializeEmailCount() {
  const count = await EmailCount.findOne();
  if (!count) {
    await EmailCount.create({ count: 0 });
  }
}


initializeEmailCount();


app.post('/api/form', async (req, res) => {
  const { uid, name, mobile, email } = req.body;

  try {
    // Store form data in MongoDB
    await Form.create({ uid, name, mobile, email });

  
    // Increment email count in the database
    let emailCountDoc = await EmailCount.findOne();
    if (!emailCountDoc) {
      emailCountDoc = await EmailCount.create({ count: 0 }); // Initialize if not found
    }
    emailCountDoc.count += 1;
    await emailCountDoc.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'shrawan2401@gmail.com', 
        pass: 'bcwcvclbvhzagdnz', 
      },
    });

    const mailOptions = {
      from: 'shrawan2401@gmail.com',
      to: email,
      subject: 'Form Submission',
      html: `
        <h1>Form Submitted</h1>
        <p>UID: ${uid}</p>
        <p>Name: ${name}</p>
        <p>Mobile: ${mobile}</p>
        <p>Email: ${email}</p>
        <p>Total Emails Sent: ${emailCountDoc.count}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.send(`Email sent successfully! Total emails sent: ${emailCountDoc.count}`);
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error
      return res.status(400).send({ message: 'This UID already exists. Please use a different UID.' });
    }
    console.error(err);
    res.status(500).send({ message: 'An error occurred while submitting the form.' });
  }
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
