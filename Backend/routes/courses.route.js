import {Router} from "express";
import {createCourse} from "../controllers/Course.controllers/createCourses.controllers.js";
import {getCoursesById} from "../controllers/Course.controllers/getCoursesById.controllers.js";
import {deleteCourse} from "../controllers/Course.controllers/deleteCourses.controllers.js";
import {updateCourseDetails} from "../controllers/Course.controllers/updateCoursesDetails.controllers.js";
import {getCourses} from "../controllers/Course.controllers/getCourses.controllers.js";
import {getUserCourses} from "../controllers/Course.controllers/getUserCourses.controllers.js";
import {addVideoToCourse} from "../controllers/Course.controllers/addVideotoCourses.controllers.js";
import {deleteVideoFromCourse} from "../controllers/Course.controllers/deleteVideoFromCourses.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/createcourses", verifyJWT, createCourse);
router.get("/courses/:courseId", getCoursesById);
router.delete("/courses/:courseId", verifyJWT, deleteCourse);
router.patch("/courses/:courseId", verifyJWT, updateCourseDetails);
router.get("/courses", getCourses);
router.get("/user-courses", verifyJWT, getUserCourses);
router.post("/courses/:courseId/videos/:videoId", verifyJWT, addVideoToCourse);
router.delete("/courses/:courseId/videos/:videoId", verifyJWT, deleteVideoFromCourse);

console.log("Courses routes loaded successfully");
export default router;