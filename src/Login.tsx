import React from 'react'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login();
        navigate("/dashboard");
    }

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" className="input mb-2 w-full" required />
                <input type="password" placeholder="Password" className="input mb-4 w-full" required />
                <button type="submit" className="btn btn-primary w-full">Login</button>
            </form>
        </div>
    )
}

export default Login