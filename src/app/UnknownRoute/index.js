import { useNavigate } from "react-router-dom";
import "./style.scss";

function UnknownPage() {
  const navigate = useNavigate();
  return (
    <div className="unknown-route-container">
      <div className="unknown-route-wrapper text-center">
        <h1 className="text-primary">404</h1>
        <p className="text-primary mt-2">PAGE NOT FOUND</p>
        <button className="mt-4" onClick={() => navigate("/")}>
          Go To Home
        </button>
      </div>
    </div>
  );
}

export default UnknownPage;
