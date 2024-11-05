# Form Submission Application

This is a full-stack application that allows users to submit a form with their details. The backend is built using Express.js with MongoDB for data storage, and the frontend is built using React with Vite and Tailwind CSS for styling.

## Features

- User can submit a form with UID, name, mobile, and email.
- Form data is stored in MongoDB.
- Each form submission triggers an email to the user with the submitted details and a count of total emails sent.
- Unique constraints on UID to prevent duplicate submissions.

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing form data and email counts.
- **Mongoose**: ODM for MongoDB, used to define schemas and interact with the database.
- **Nodemailer**: Module for sending emails.
- **CORS**: Middleware for enabling CORS in Express.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool that provides a fast development environment.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shrawan7650/ADC.git
   cd /backend
  cd /frontend
