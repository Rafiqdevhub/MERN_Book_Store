const Home = () => {
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button className="bg-sky-300 hover:  px-4 py-1 rounded-lg">
          Table
        </button>
        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
          Form
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
      </div>
    </div>
  );
};

export default Home;
