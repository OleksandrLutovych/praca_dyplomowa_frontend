import { useParams } from "react-router-dom";

const DoctorViewPage = () => {
  const { id } = useParams();
  return <div>DoctorViewPage</div>;
};

export default DoctorViewPage;
