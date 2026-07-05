import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/category.model.js";

/*
|--------------------------------------------------------------------------
| Category DB  Validation
|--------------------------------------------------------------------------
*/

export const validateCategoryDB = async (category) => {
    const categoryExists = await Category.findOne({
        name: category
    });
    if (category && !categoryExists) {
        throw new ApiError(
            400,
            "Category does not exist in the database"
        );
    }
};