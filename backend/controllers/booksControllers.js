import Book from "../model/bookModel.js";

const createBook = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.description ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: "All fields are required." });
    }
    const existingBook = await Book.findOne({ title: req.body.title });
    if (existingBook) {
      return res
        .status(400)
        .send({ message: "A book with the same title already exists." });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res
      .status(201)
      .send({ message: "Book created successfully.", book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred.", error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (
      !req.body.title &&
      !req.body.author &&
      !req.body.description &&
      !req.body.publishYear
    ) {
      return res
        .status(400)
        .send(
          "At least one of 'title', 'author', or 'publishYear' is required."
        );
    }

    const updateData = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.author) updateData.author = req.body.author;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.publishYear) updateData.publishYear = req.body.publishYear;

    const result = await Book.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) {
      return res.status(404).send("Book not found.");
    }
    return res
      .status(200)
      .send({ message: "Book updated successfully", book: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

export { createBook, getBooks, getBookById, updateBook, deleteBook };
