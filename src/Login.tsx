import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { FcGoogle } from 'react-icons/fc';

const Login: React.FC = () => {
  const { login, loginWithGoogle, user, role } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      setLoggingIn(true);
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password.');
      setLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoggingIn(true);
      await loginWithGoogle();
    } catch (err) {
      setError('Google login failed. Try again.');
      setLoggingIn(false);
    }
  };

  // Wait for user and role to be ready after login
  useEffect(() => {
    if (user && role) {
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, role, navigate]);

  return (
    <>
      <div className="flex justify-center items-center my-5">
        <img
          src="/studentHub.png"
          alt="studentHub"
          className="w-60 h-60 rounded-full cursor-pointer"
        />
      </div>
      <div className="max-w-sm mx-auto my-5 p-6 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

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
            disabled={loggingIn}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">OR</div>

        <button
          onClick={handleGoogleLogin}
          disabled={loggingIn}
          className="flex items-center justify-center gap-2 w-full bg-white border px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          <span>Sign in with Google</span>
        </button>

        <div className="text-right mt-4">
          <span className="text-sm text-gray-600 mr-2">Don't have an account?</span>
          <Link to="/signup" className="text-blue-600 text-sm hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
