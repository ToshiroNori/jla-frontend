// hooks/useAuthGuard.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@/features/authSlice";
import { useNavigate } from "react-router-dom";

export function useAuthGuard() {
  const { user, loading, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !user && !isAuth) {
      navigate("/login");
    }
  }, [loading, user, isAuth, navigate]);

  return { user, loading, isAuth };
}
