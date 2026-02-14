import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    const secureCookie =
      process.env.COOKIE_SECURE === "true" ||
      process.env.NODE_ENV === "production";
    const sameSite = secureCookie ? "none" : "lax";

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: secureCookie,
        sameSite,
        path: "/",
        maxAge: 1 * 24 * 60 * 60 * 1000
    })
}

export default generateToken;
