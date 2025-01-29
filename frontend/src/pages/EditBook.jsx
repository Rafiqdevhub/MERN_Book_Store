import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { api } from "../constant/api";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishYear, setPublishYear] = useState(" ");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/${id}`);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setDescription(res.data.description);
        setPublishYear(res.data.publishYear);
      } catch (err) {
        enqueueSnackbar("Error Retrieving Book", { variant: "error" });
        alert("error");
        throw new Error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  const handleEditBook = async () => {
    const data = {
      title,
      author,
      description,
      publishYear,
    };
    setLoading(true);
    try {
      await axios.put(`${api}/update-book/${id}`, data);
      enqueueSnackbar("Updated Successfully", { variant: "success" });
      navigate("/");
    } catch (err) {
      enqueueSnackbar("Error", { variant: "error" });
      throw new err();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Published Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 hover:cursor-pointer"
          onClick={handleEditBook}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBook;
