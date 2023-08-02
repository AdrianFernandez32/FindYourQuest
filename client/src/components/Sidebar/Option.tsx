import { ReactElement } from "react";
import { IconBaseProps, IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  icon: ReactElement;
  route: string;
};

const Option = ({ name, icon, route }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full flex justify-start items-center p-5 gap-2 duration-150 text-black hover:text-white hover:bg-[#55ab00] cursor-pointer"
      onClick={() => navigate(route)}
    >
      {icon}
      <h1 className="font-semibold text-xl">{name}</h1>
    </div>
  );
};

export default Option;
