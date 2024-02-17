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
exports.resolvers = void 0;
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../../client/db");
const jwt_1 = __importDefault(require("../../services/jwt"));
const queries = {
    verifyGoogleToken: (parent, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const googleToken = token;
        const googleOauthURl = new URL("https://oauth2.googleapis.com/tokeninfo");
        googleOauthURl.searchParams.set("id_token", googleToken);
        const { data } = yield axios_1.default.get(googleOauthURl.toString(), {
            responseType: "json",
        });
        const user = yield db_1.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            yield db_1.prisma.user.create({
                data: {
                    email: data.email || ``,
                    firstName: data.given_name || ``,
                    lastName: data.family_name,
                    profileImageURL: data.picture,
                },
            });
        }
        const userIn = yield db_1.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!userIn) {
            return "User not found";
        }
        const userToken = jwt_1.default.generateTokenForUser(userIn);
        return userToken;
    }),
};
exports.resolvers = { queries };
