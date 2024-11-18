import { useNavigate } from "react-router-dom";

interface LogoutComponentProps {
  show: boolean;
}

const LogoutComponent = ({ show }: LogoutComponentProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div
      className={`container-logout ${
        show ? "flex" : "hidden"
      } cursor-pointer absolute px-5 ml-[89%] mt-[9%] bg-white shadow-lg flex p-3 justify-between items-center rounded-2xl w-[150px] h-[45px]`}
    >
      <p className="font-medium">Logout</p>
      <button onClick={handleLogout} className="text-2xl bi bi-box-arrow-right"></button>
    </div>
  );
};

export default LogoutComponent;
