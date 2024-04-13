import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory(); // Access the history object

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      console.log(response.data);
      onLogin(response.data.username); // Call the onLogin function passed from the parent component with the username
      setEmail(''); // Clear email field
      setPassword(''); // Clear password field
      setErrorMessage(''); // Clear error message

      // Navigate to Main component after successful login
      history.push('/main'); // Navigate to '/main' route
    } catch (error) {
      console.error(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response from server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('Error occurred. Please try again later.');
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
export default Login;
