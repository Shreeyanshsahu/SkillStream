import mongoose from "mongoose";
import dotenv from "dotenv";
import { Category } from "../Backend/models/category.model.js";

dotenv.config();

const categories = [
    { name: "Programming" },
    { name: "Web Development" },
    { name: "Data Structures & Algorithms" },
    { name: "Machine Learning" },
    { name: "Artificial Intelligence" },
    { name: "DevOps" },
    { name: "Cyber Security" },
    { name: "Mobile Development" },
    { name: "Database" },
    { name: "System Design" },
    { name: "Operating Systems" },
    { name: "Computer Networks" },
    { name: "Interview Preparation" },
    { name: "Career Guidance" },
    { name: "Productivity" }
];
import {DB_NAME} from "../Backend/constants.js";

async function seed() {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);

        await Category.deleteMany({});

        await Category.insertMany(categories);

        console.log("Categories seeded successfully!");

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();