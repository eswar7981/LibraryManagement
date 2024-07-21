const Book = require("../../database/Schemas/Book");

exports.search = async (req, res) => {
  const { title, category, author } = req.query;
  const regexpTitle = new RegExp(`${title}`, "gi");
  const regexpCategory = new RegExp(`${category}`, "gi");
  const regexpAuthor = new RegExp(`${author}`, "gi");
  try {
    const Books = await Book.find({
      title: { $regex: regexpTitle },
      category: { $regex: regexpCategory },
      author: { $regex: regexpAuthor },
    });

    res.status(200).json({ status: "success", books: Books });
  } catch (e) {
    res.status(400).json({ status: "failed" });
  }
};
