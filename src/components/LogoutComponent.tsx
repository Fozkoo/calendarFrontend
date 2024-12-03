import { useAuth } from "../context/AuthContext";

interface LogoutComponentProps {
  show: boolean;
}

const LogoutComponent = ({ show }: LogoutComponentProps) => {
  const {logout} = useAuth();


  return (
    <div
      className={`container-logout ${
        show ? "flex" : "hidden"
      } cursor-pointer absolute px-5 ml-[89%] mt-[9%] bg-white shadow-lg flex p-3  justify-between items-center rounded-2xl w-[150px] h-[45px] max-2xl:gap-2 max-2xl:right-3 max-2xl:w-[120px] max-2xl:top-[33px] max-2xl:h-[30px]`}
    onClick={logout}>
      <p className="font-medium">Logout</p>
      <button  className="text-2xl bi bi-box-arrow-right max-2xl:text-xl"></button>
    </div>
  );
};

export default LogoutComponent;
