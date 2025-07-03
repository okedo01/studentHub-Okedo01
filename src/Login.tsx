import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div className="text-right mt-4">
        <span className="text-sm text-gray-600 mr-2">Don't have an account?</span>
        <Link to="/signup" className="text-blue-600 text-sm hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
