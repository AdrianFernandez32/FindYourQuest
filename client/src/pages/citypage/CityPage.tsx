import { useParams } from "react-router";

const CityPage = () => {
  const { id } = useParams();
  return <div className="w-full flex flex-col h-screen items-center">{id}</div>;
};

export default CityPage;
