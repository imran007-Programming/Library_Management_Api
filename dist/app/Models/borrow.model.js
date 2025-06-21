"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBookslist = void 0;
const mongoose_1 = require("mongoose");
const borrowBooksSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity must be a positive number"],
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.BorrowBookslist = (0, mongoose_1.model)("BorrowBookslist", borrowBooksSchema);
