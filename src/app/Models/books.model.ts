import { model, Model, Schema } from "mongoose";
import {
  BookintanceDocument,
  BOOksInterface,
  // BooksStaticModel,
} from "../Interfaces/books.interface";

const booksSchema = new Schema<BookintanceDocument>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

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
booksSchema.methods.setAvailability = async function () {
  if (this.copies <= 0 && this.available === true) {
    this.available = false;
    await this.save();
  } else if (this.copies > 0 && this.available === false) {
    this.available = true;
    await this.save();
  }
};
/* middleware for change the availabe value flase to true vice verse */
booksSchema.pre("save", function (next) {
  if (this.copies <= 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});
;


export const Books = model<BookintanceDocument>("Books", booksSchema);
