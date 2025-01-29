import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../constant/api";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/${id}`);
        setBook(response.data);
      } catch (error) {
        throw new error();
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4"> Book Details</h1>
      {loading ? (
        <Spinner />
      ) : book ? (
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4">
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Title:</span>
            <span> {book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Author:</span>
            <span> {book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Description:</span>
            <span> {book.description}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Publish Year:</span>
            <span> {book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Created At:</span>
            <span> {new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">
              Last Update Time:
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      ) : (
        <p className="text-red-500">No book data found.</p>
      )}
    </div>
  );
};

export default ShowBook;
