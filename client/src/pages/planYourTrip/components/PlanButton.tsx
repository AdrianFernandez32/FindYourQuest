// PlanButton.tsx
import { IconType } from "react-icons";

type Props = {
  name: string;
  icon: IconType;
  size: string;
  onOpen: () => void;
};

const PlanButton: React.FC<Props> = ({
  name,
  icon: Icon,
  size,
  onOpen,
}: Props) => {
  return (
    <button
      onClick={onOpen}
      className="h-28 w-36 md:w-40 flex flex-col border border-[#55ab00] justify-center items-start text-white font-semibold bg-[#55ab00] px-3 md:px-4 rounded-xl duration-200 hover:bg-white hover:text-[#55ab00] hover:border-2"
    >
      <p className="text-xl md:text-2xl mb-2">{name}</p>
      <Icon size={size} />
    </button>
  );
};

export default PlanButton;
