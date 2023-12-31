import jwt from "jsonwebtoken";
import User from "../models/User";

export const checkPermission = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    // console.log(token);
    if (!authHeader) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập",
        });
    }

    jwt.verify(token, "bookShop", async (err, payload) => {
        if (err) {
            if (err.name === "JsonWebTokenError") {
                return res.status(400).json({
                    message: "Token không hợp lệ",
                });
            }
            if (err.name === "TokenExpiredError") {
                return res.status(400).json({
                    message: "Token đã hết hạn",
                });
            }
        }
        const user = await User.findById(payload.id);
        if (user && user.role !== "admin") {
            console.log("123");
            return res.status(403).json({
                message: "Bạn không có quyền thực hiện hành động này",
            });
        }
        next();
    });
};

// Kiểm tra req.headers.authorization có tồn tại hay không?
// Kiểm tra token có hợp lệ hay không?
// Dựa vào token để lấy payload, so sánh với id của user trong db
// Kiểm tra xem quyền của user có đủ để thực hiện hành động hay không?
// Nếu có thì next(), không thì trả về lỗi
