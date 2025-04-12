import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, error, authChecked } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#0c0c1a] flex flex-col items-center justify-center text-[#FAFAFA]">
        <h1 className="border-4 border-[#fafafa] border-t-[#09090B] rounded-full w-16 h-16 animate-spin"></h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#27272A] flex flex-col items-center justify-center text-[#FAFAFA]">
      <div className="w-md bg-[#09090B] shadow-lg rounded-lg p-6 space-y-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">Welcome back</h1>
            <span className="text-[#71717A] text-1xl font-medium">
              Login to your Acme Inc account
            </span>
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="w-full bg-[#09090B] text-[#FAFAFA] border-b-2 border-[#71717A] focus:outline-none focus:border-[#FBBF24] placeholder:text-[#71717A] p-2"
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
              className="w-full bg-[#09090B] text-[#FAFAFA] border-b-2 border-[#71717A] focus:outline-none focus:border-[#FBBF24] placeholder:text-[#71717A] p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="text-[#FBBF24] text-sm font-medium hover:underline"
            >
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="text-[#FBBF24] text-sm font-medium hover:underline"
            >
              Register
            </Link>
          </div>

          <button
            type="submit"
            className="text-black px-4 py-2 rounded w-full cursor-pointer bg-[#FAFAFA]"
          >
            Login
          </button>
        </form>
        {error && (
          <h1 className="text-red-500 uppercase text-center">{error}</h1>
        )}
      </div>
    </div>
  );
}
