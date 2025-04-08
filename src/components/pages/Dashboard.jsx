import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { getJobs } from "../../features/jobSlice";

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
    return <div>Loading...</div>;
  }

  return (
    <div>
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
