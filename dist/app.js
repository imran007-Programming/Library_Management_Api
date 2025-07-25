"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const books_controller_1 = require("./app/Controllers/books.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'https://librarymanagementapp.vercel.app',
        //  "http://localhost:5173"
    ]
}));
app.use("/api", books_controller_1.booksRoutes);
app.get("/", (req, res) => {
    res.send({
        message: "this is library management api",
    });
});
exports.default = app;
