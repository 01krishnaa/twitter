import axios from "axios";
import { prisma } from "../../client/db";
import JWTService from "../../services/jwt";

interface GoogleTokenResult {
  iss?: string;
  nbf?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: string;
  azp?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOauthURl = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOauthURl.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenResult>(
      googleOauthURl.toString(),
      {
        responseType: "json",
      }
    );

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          email: data.email || ``,
          firstName: data.given_name || ``,
          lastName: data.family_name,
          profileImageURL: data.picture,
        },
      });
    }

    const userIn = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!userIn) {
      return "User not found";
    }

    const userToken = JWTService.generateTokenForUser(userIn);
    return userToken;
  },
};

export const resolvers = { queries };
