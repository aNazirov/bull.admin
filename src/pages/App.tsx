import { Layout } from "components/global/layout";
import { Login } from "components/pages/login";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { autoLogIn } from "store/global/global.thunks";
import { useAppDispatch, useAppSelector } from "store/hooks";
import "./App.scss";

function App() {
  const { token } = useAppSelector((state) => state.global);
  const { pathname } = useLocation();

  const [load, setLoad] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && !token) {
      setLoad(true);
      dispatch(autoLogIn())
        .then(() => {
          if (pathname === "/login") {
            navigate("/");
          }
        })
        .finally(() => setLoad(false));
    } else {
      setLoad(false);
    }
  }, [dispatch]);

  if (load) return null;

  return (
    <>
      {token ? (
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
