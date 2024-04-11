import React, { useState } from 'react';

function Register({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.error || 'Registration failed');
      } else {
        setErrorMessage('');
        console.log(data.message);
        // Notify parent component of successful registration
        onRegisterSuccess();
        // Clear form data
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Register;
