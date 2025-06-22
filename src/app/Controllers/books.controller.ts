import express, { Request, Response } from "express";
import { Books } from "../Models/books.model";
import { BorrowBookslist } from "../Models/borrow.model";
export const booksRoutes = express.Router();

/* Create a New Book */
booksRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const books = await Books.create(body);
    res.status(201).json({
      success: true,
      message: "Books created successfully",
      data: books,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: error,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: error.message || error,
      });
    }
  }
});
/* Get all books by  sorting,filtering and limit */
booksRoutes.get("/books", async (req: Request, res: Response) => {
  const filter = req.query.filter as string;
  const sortBy = req.query.sortBy as "asc" | "desc";
  const limit = parseInt(req.query.limit as string);

  const querydata: any = {};
  if (filter) {
    querydata.genre = filter;
  }
  const querydataBySort: any = {};
  if (sortBy) {
    querydataBySort.isbn = sortBy;
  }

  try {
    const books = await Books.find(querydata)
      .sort(querydataBySort)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved  successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
});

/* Get a book by its Id */
booksRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const getbookById = await Books.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: getbookById,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
});

/* Update a book by its Id */
booksRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const body = req.body;

    const updatedBook = await Books.findByIdAndUpdate(bookId, body, {
      new: true,
    });
    if (updatedBook) {
      await updatedBook.setAvailability();
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
});

/* Delete a book by its id */
booksRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const deletedtedBook = await Books.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedtedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
});

/* * borrow a book by its id */

booksRoutes.post("/borrow", async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  try {
    const speceficBook = await Books.findById(book);
    /* check the book is exists */
    if (!speceficBook) {
      res.status(404).json({
        success: false,
        message: "Book can not found",
      });
    } else if (quantity > speceficBook.copies) {
      /* Check the book has enough copies to borrow  */
      res.status(400).json({
        success: false,
        message: `you cannot borrow ${quantity} bcz book has total ${speceficBook.copies} quantity`,
      });
    } else {
      /* if book has enough coppies then  borrow the book  and deducted the value of its copies */
      if (speceficBook.copies > 0) {
        speceficBook.copies -= quantity;

        const borrowBooks = await BorrowBookslist.create({
          book,
          quantity,
          dueDate,
        });
        await speceficBook.save();
        await speceficBook.setAvailability();
        res.status(200).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrowBooks,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Book is out of stock",
        });
      }
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
});

/*  Borrowed Books Summary (Using Aggregation) */
booksRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const borrowQuantity = await BorrowBookslist.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
    ]).project({ _id: 0, "book.title": 1, "book.isbn": 1, totalQuantity: 1 });

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowQuantity,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
