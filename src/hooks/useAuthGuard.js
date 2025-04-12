// src/hooks/useAuthGuard.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const { user, authChecked } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authChecked && !user) {
      navigate("/login");
    }
  }, [authChecked, user, navigate]);

  return { user, authChecked };
};
