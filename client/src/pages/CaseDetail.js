import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CaseDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cases/${id}`)
      .then(res => setData(res.data));
  }, [id]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};
export default CaseDetail;