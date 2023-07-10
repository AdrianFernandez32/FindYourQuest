import { ReactElement } from "react";
import { IconBaseProps, IconType } from "react-icons";

type Props = {
  name: string;
  icon: ReactElement;
};

const Option = ({ name, icon }: Props) => {
  return (
    <div className="w-full flex justify-start items-center p-5 gap-2 duration-150 text-black hover:text-white hover:bg-[#55ab00]">
      {icon}
      <h1 className="font-semibold text-xl">{name}</h1>
    </div>
  );
};

export default Option;
