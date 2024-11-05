// src/App.jsx
import React from 'react';

import './index.css'; // Make sure Tailwind CSS is imported
import FormComponent from './components/Form';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FormComponent />
    </div>
  );
};

export default App;
