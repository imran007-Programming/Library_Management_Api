import { Model } from "mongoose";

export interface BOOksInterface {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}
/* static interface */
// export interface BooksStaticModel extends Model<BOOksInterface> {
//   setAvailability(bookId: string): Promise<void>;
// }

/* intance interface */
export interface BookintanceDocument extends BOOksInterface, Document {
  setAvailability(): Promise<void>;
}
