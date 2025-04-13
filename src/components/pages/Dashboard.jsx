import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../features/jobSlice";
import Layout from "../layout/Layout.jsx";
import { getUser } from "@/features/authSlice";
import Spinner from "../Spinner";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user, loading, isAuth } = useAuthGuard();

  const {
    jobs,
    loading: jobLoading,
    error: jobError,
  } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && isAuth) {
      dispatch(getJobs());
    }
  }, [dispatch, user, isAuth]);

  if (jobLoading || loading) {
    return <Spinner />;
  }

  if (!isAuth) {
    return null; // You can also redirect here directly if necessary
  }

  return (
    <Layout className="bg-[#F9F9F9]">
      <h1 className="p-4">Welcome, {user?.name}!</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5 p-5">
        {jobs.map((job) => (
          <div
            className="bg-slate-300 shadow p-4 rounded flex flex-col justify-between"
            key={job._id}
          >
            <h2 className="font-bold text-xl mb-2">{job.title}</h2>
            <p>{job.description}</p>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.datePosted.split("T")[0]}</p>
            <p className="font-semibold">$ {job.salary}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
