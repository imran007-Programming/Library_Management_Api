"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../Models/books.model");
const borrow_model_1 = require("../Models/borrow.model");
const zod_1 = require("zod");
exports.booksRoutes = express_1.default.Router();
/* zod validation for create a book */
const createBooksZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    isbn: zod_1.z.string(),
    genre: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean()
});
/* Create a New Book */
exports.booksRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const zodvalidation = yield createBooksZodSchema.parseAsync(body);
        const books = yield books_model_1.Books.create(zodvalidation);
        res.status(201).json({
            success: true,
            message: "Books created successfully",
            data: books,
        });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: error,
            });
        }
        else {
            res.status(500).json({
                message: "Something went wrong",
                success: false,
                error: error.errors,
            });
        }
    }
}));
/* Get all books by  sorting,filtering and limit */
exports.booksRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter;
    const sortBy = req.query.sortBy;
    const limit = parseInt(req.query.limit);
    const querydata = {};
    if (filter) {
        querydata.genre = filter;
    }
    const querydataBySort = {};
    if (sortBy) {
        querydataBySort.isbn = sortBy;
    }
    try {
        const books = yield books_model_1.Books.find(querydata)
            .sort(querydataBySort)
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved  successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
}));
/* Get a book by its Id */
exports.booksRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const getbookById = yield books_model_1.Books.findById(bookId);
        if (!getbookById) {
            res.status(404).json({
                success: false,
                message: "book doesn't exist"
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: getbookById,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
}));
/* Update a book by its Id */
exports.booksRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        if (body.copies < 0) {
            res.status(400).json({
                success: false,
                message: "copies must be positive number"
            });
        }
        const updatedBook = yield books_model_1.Books.findByIdAndUpdate(bookId, body, {
            new: true,
        });
        if (updatedBook) {
            yield updatedBook.setAvailability();
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
}));
/* Delete a book by its id */
exports.booksRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedtedBook = yield books_model_1.Books.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedtedBook,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
}));
/* * borrow a book by its id */
exports.booksRoutes.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    try {
        const speceficBook = yield books_model_1.Books.findById(book);
        /* check the book is exists */
        if (!speceficBook) {
            res.status(404).json({
                success: false,
                message: "Book can not found",
            });
        }
        else if (quantity > speceficBook.copies) {
            /* Check the book has enough copies to borrow  */
            res.status(400).json({
                success: false,
                message: `you cannot borrow ${quantity} bcz book has total ${speceficBook.copies} quantity`,
            });
        }
        else {
            /* if book has enough coppies then  borrow the book  and deducted the value of its copies */
            if (speceficBook.copies > 0) {
                speceficBook.copies -= quantity;
                const borrowBooks = yield borrow_model_1.BorrowBookslist.create({
                    book,
                    quantity,
                    dueDate,
                });
                yield speceficBook.save();
                yield speceficBook.setAvailability();
                res.status(200).json({
                    success: true,
                    message: "Book borrowed successfully",
                    data: borrowBooks,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Book is out of stock",
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
}));
/*  Borrowed Books Summary (Using Aggregation) */
exports.booksRoutes.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowQuantity = yield borrow_model_1.BorrowBookslist.aggregate([
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
