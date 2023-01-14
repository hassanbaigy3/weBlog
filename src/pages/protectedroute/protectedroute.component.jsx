import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { history } from "../../helpers/history.helper";

function ProtectedRoute({ componentToPassDown }) {
  const currentUser = useSelector((state) => state.currentUser);

  if (currentUser.accessToken === undefined) {
    return <Navigate to="/login" state={{ from: history.location }} />;
  }
  return componentToPassDown;
}
export default ProtectedRoute;
