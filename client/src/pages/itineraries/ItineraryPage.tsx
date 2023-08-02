import { useParams } from "react-router";
import Layout from "../../components/Layout";

const ItineraryPage = () => {
  const { id } = useParams<{ id: string }>();

  return <Layout></Layout>;
};

export default ItineraryPage;
