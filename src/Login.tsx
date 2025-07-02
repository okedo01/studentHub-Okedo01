import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// Login.tsx
const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded example — replace with real logic
    const mockUser = {
      username: 'adminUser',
      role: 'admin' as const,
    };

    login(mockUser);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Username" required />
      <input type="password" placeholder="Password" required />
      <select name="role">
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login