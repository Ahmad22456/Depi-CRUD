import { useNavigate, useParams } from "react-router-dom";
import GetData from "./../hooks/GetData";
import axios from "axios";

function ViewUserPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, loading] = GetData(`http://localhost:5000/${params.id}`);

  async function deleteUser() {
    await axios.delete(`http://localhost:5000/${params.id}`);
    navigate("/");
  }

  return (
    <div>
      {loading ? (
        <loading />
      ) : (
        <>
          <div className="text-3xl mb-4">Name: {data[0].name}</div>
          <div className="text-2xl">Email: {data[0].email}</div>
          <button
            onClick={() => deleteUser()}
            className="bg-red-600 mt-4 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ViewUserPage;
