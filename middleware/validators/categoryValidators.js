const { body } = require("express-validator");

exports.CategoryValidator = [
    body('category_name').notEmpty().trim().withMessage('Category is required'),
    body('status').notEmpty().withMessage('status is required'),
]