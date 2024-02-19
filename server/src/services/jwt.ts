import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const SECRET_KEY = `Admin@123`;

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload = {
      id: user?.id,
      email: user?.email,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    return token;
  }
}

export default JWTService;
