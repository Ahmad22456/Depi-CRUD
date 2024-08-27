import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GetData from "./../hooks/GetData";
import Loading from "./../components/Loading";
import axios from "axios";

function EditUserPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, loading] = GetData(`http://localhost:5000/${params.id}`);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    await axios.put(`http://localhost:5000/${params.id}`, {
      name,
      email,
    });
    navigate("/");
  }

  return (
    <div className="w-full">
      {loading ? (
        <Loading />
      ) : (
        <form
          className="w-1/2 mt-20 mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="w-full h-14 relative border-blue-500 border-2 rounded-md">
              <label className="absolute top-1 left-2 text-xs text-zinc-800">
                Username
              </label>
              <input
                type="text"
                className="size-full border-none bg-transparent outline-none pt-6 pl-6 placeholder:text-black"
                placeholder={data[0].name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full h-14 relative border-blue-500 border-2 rounded-md">
              <label className="absolute top-1 left-2 text-xs text-zinc-800">
                Email
              </label>
              <input
                type="email"
                className="size-full border-none bg-transparent outline-none pt-6 pl-6 placeholder:text-black"
                placeholder={data[0].email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="ml-auto py-2 px-4 rounded-md bg-blue-900 text-white"
            >
              Confirm
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditUserPage;
