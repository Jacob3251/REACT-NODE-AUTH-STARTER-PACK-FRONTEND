import { useNavigate } from "react-router-dom";
import CustomNavigationMenu from "./CustomNavigationMenu";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-5 py-2 ">
      <div
        onClick={() => navigate("/")}
        className="font-pacifico font-extrabold text-[24px] hidden lg:block cursor-pointer"
      >
        Tiktok
      </div>
      <div className="font-roboto font-extrabold text-[24px] lg:hidden">Tk</div>
      <div className="flex space-x-4">
        <CustomNavigationMenu></CustomNavigationMenu>
      </div>
    </div>
  );
}

export default Navbar;
