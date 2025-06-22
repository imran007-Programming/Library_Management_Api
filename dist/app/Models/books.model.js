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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "author name is required"],
    },
    genre: {
        type: String,
        required: [true, "genre is required"],
    },
    isbn: {
        type: String,
        required: [true, "isbn number is required"],
        unique: true,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        min: [0, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
/* Static method for change the books Availablity */
// booksSchema.statics.setAvailability = async function (bookId: string) {
//   const book = await this.findById(bookId);
//   if (!book) return;
//   if (book.copies < 1 && book.available === true) {
//     book.available = false;
//     await book.save();
//   } else if (book.copies > 0 && book.available === false) {
//     book.available = true;
//     await book.save();
//   }
// };
/* Instance method for change the books Availability */
booksSchema.methods.setAvailability = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies < 1 && this.available === true) {
            this.available = false;
            yield this.save();
        }
    });
};
/* middleware for change the availabe value flase to true */
booksSchema.pre("save", function (next) {
    if (this.copies > 0 && this.available === false) {
        this.available = true;
        this.save();
    }
    next();
});
exports.Books = (0, mongoose_1.model)("Books", booksSchema);
