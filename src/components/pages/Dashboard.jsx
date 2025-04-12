import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../../features/authSlice";
import { getJobs } from "../../features/jobSlice";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import Navbar from "../partials/Navbar";
import Footer from "../partials/Footer";

export default function Dashboard() {
  const { user, authChecked } = useAuthGuard();
  const {
    jobs,
    loading: jobLoading,
    error: jobError,
  } = useSelector((state) => state.job);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Fetch user on first load
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Once authChecked is true, decide what to do
  useEffect(() => {
    if (authChecked && user) {
      dispatch(getJobs());
    }
  }, [authChecked, user, dispatch]);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  // Show spinner while checking auth or loading jobs
  if (!authChecked || jobLoading) {
    return (
      <div className="w-full h-screen bg-[#0c0c1a] flex flex-col items-center justify-center text-[#FAFAFA]">
        <h1 className="border-4 border-[#fafafa] border-t-[#09090B] rounded-full w-16 h-16 animate-spin"></h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <h1>Welcome, {user?.name}!</h1>
      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
