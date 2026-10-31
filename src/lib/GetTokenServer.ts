import { headers } from "next/headers";
import { auth } from "./auth";

export const GetTokenServer = async() => {
  const token = await auth.api.getToken({
    headers: await headers(),
  });

  const jwtToken = token?.token;
  return jwtToken
}