import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        const response = await axios.post(
          `${import.meta.env.VITE_ADMIN_API}/admin/login`,
          { email: form.email, password: form.password }
        );
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin-portal/dashboard');
      } else {
        if (form.password !== form.confirmPassword) {
          alert('Passwords do not match.');
          setLoading(false);
          return;
        }
        await axios.post(
          `${import.meta.env.VITE_ADMIN_API}/admin/register`,
          { email: form.email, password: form.password, fullName: form.email }
        );
        alert('Registration successful! Please log in.');
        setMode('login');
        setForm({ email: '', password: '', confirmPassword: '' });
      }
    } catch (error) {
      console.error(`${mode === 'login' ? 'Login' : 'Registration'} failed:`, error);
      alert(`${mode === 'login' ? 'Login' : 'Registration'} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{mode === 'login' ? 'Admin Login' : 'Admin Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          {mode === 'register' && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="login-input"
            />
          )}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Log In' : 'Register')}
          </button>
        </form>
        <div className="login-toggle">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button type="button" onClick={() => setMode('register')} className="toggle-link">Register</button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('login')} className="toggle-link">Log In</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
