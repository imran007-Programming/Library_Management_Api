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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const PORT = 4000;
const uri = process.env.MONGODB_URI;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(uri);
        console.log("✅✅database connected successfully");
        try {
            server = app_1.default.listen(PORT, () => {
                console.log(`👿👿 server is running in ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
