import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { getJobs } from "../../features/jobSlice";
import Navbar from "../partials/Navbar";

export default function Dashboard() {
  const { user, loading, error } = useSelector((state) => state.auth);
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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getJobs());
  }, [user]);

  useEffect(() => {
    console.log("Jobs:", jobs);
  }, []);

  if (loading || jobLoading) {
    return (
      <div className="w-full h-screen bg-[#27272A] flex flex-col items-center justify-center text-[#FAFAFA]">
        <h1 className="border-4 border-[#fafafa] border-t-[#09090B] rounded-full w-16 h-16 animate-spin"></h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Welcome {user?.candidate.name}</h1>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
        </div>
      ))}
    </div>
  );
}
