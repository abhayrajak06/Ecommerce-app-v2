import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  const authCheck = async () => {
    const res = await axios.get("/api/v2/auth/admin-auth");
    if (res?.data.ok) {
      setOk(true);
    } else {
      setOk(false);
    }
  };

  useEffect(() => {
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
