import type { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    return (decodedToken as { id: string }).id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};