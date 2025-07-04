import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    setError('');
    setLoading(true);
    try {
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('❌ User already exists or invalid input.');
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

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
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-right mt-4">
          <span className="text-sm text-gray-600 mr-2">Already have an account?</span>
          <Link to="/login" className="text-blue-600 text-sm hover:underline">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
