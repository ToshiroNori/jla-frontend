import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJobs } from "../../features/jobSlice";
import Layout from "../layout/Layout.jsx";
import Spinner from "../Spinner";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { PlusCircle } from "lucide-react";
import { Button } from "@mui/material";

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
    <Layout className="bg-[#F9F9F9] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 sm:p-4 text-center sm:text-left">
        <h1 className="font-roboto text-4xl sm:text-3xl text-gray-800">
          Welcome, {user?.name}!
        </h1>
        <Button
          sx={{
            backgroundColor: "#09090B",
            "&:hover": { backgroundColor: "#1C1C1E" },
          }}
          size="large"
          variant="contained"
          startIcon={<PlusCircle />}
        >
          Add new job
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-6">
        {jobs.map((job) => (
          <div
            className="shadow-lg p-6 rounded-2xl flex flex-col justify-between space-y-3 bg-white font-roboto"
            key={job._id}
          >
            <h2 className="font-bold text-2xl text-gray-900 mb-1">
              {job.title}
            </h2>
            <p className="text-gray-700 line-clamp-3">{job.description}</p>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
            <p className="text-gray-400 text-sm">
              {job.datePosted.split("T")[0]}
            </p>
            <p className="text-lg text-green-600 font-semibold">
              $ {job.salary}
            </p>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0F172A",
                "&:hover": { backgroundColor: "#1E293B" },
              }}
            >
              Apply now
            </Button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
