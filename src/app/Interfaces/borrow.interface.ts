import { Types } from "mongoose";

export interface BorrowInterface {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
