import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <Link to="/register">Register</Link>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col items-center justify-center">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
