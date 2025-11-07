import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    // for local development here we are using the same site policy(http only)
    // res.cookie("jwt", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV || "development",
    //     sameSite: true,
    //     maxAge: 1 * 24 * 60 * 60 * 1000
    // })

    // for production deployment we are using the cross-domain policy(none)
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "none", // required for cross-domain cookies
        path: "/",
        maxAge: 1 * 24 * 60 * 60 * 1000
    })
}

export default generateToken;