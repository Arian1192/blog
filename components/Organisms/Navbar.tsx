import { Logo } from "../Atoms/Logo";
import { HomeIcon } from "../Atoms/HomeIcon";


export const Navbar = () => {
  return (
    <div className="w-full flex justify-between md:justify-around items-center h-auto p-5 absolute top-0 ">
      <Logo />
      <HomeIcon path="/"/>
    </div>
  );
};
