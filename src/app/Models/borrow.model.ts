import { model, Schema } from "mongoose";
import { BorrowInterface } from "../Interfaces/borrow.interface";

const borrowBooksSchema = new Schema<BorrowInterface>(
  {
    book: {
      type: Schema.Types.ObjectId,
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const BorrowBookslist = model("BorrowBookslist", borrowBooksSchema);
