import joi from "joi"

export const orderSchema = joi.object({
    userId: joi.string().required(),
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    address: joi.string().required(),
    note: joi.string(),
    status: joi.number().required(),
    totalMoney: joi.number().required().min(0),
    deleted: joi.boolean().default(false),
})