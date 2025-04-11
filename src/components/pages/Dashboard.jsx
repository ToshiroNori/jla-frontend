import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../../features/authSlice";
import { getJobs } from "../../features/jobSlice";
import Navbar from "../partials/Navbar";

export default function Dashboard() {
  const { user, loading, error, authChecked } = useSelector(
    (state) => state.auth
  );
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
    if (authChecked) {
      if (!user) {
        navigate("/login");
      } else {
        dispatch(getJobs());
      }
    }
  }, [authChecked, user, dispatch, navigate]);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  // Show spinner while checking auth or loading jobs
  if (!authChecked || loading || jobLoading) {
    return (
      <div className="w-full h-screen bg-[#27272A] flex flex-col items-center justify-center text-[#FAFAFA]">
        <h1 className="border-4 border-[#fafafa] border-t-[#09090B] rounded-full w-16 h-16 animate-spin"></h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Welcome, {user?.name || "User"}!</h1>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
      {/* {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
        </div>
      ))} */}
    </div>
  );
}
