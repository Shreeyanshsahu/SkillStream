import {Router} from "express";
import {createCourse} from "../controllers/Course.controllers.js/createCourses.controllers.js";
import {getCoursesById} from "../controllers/Course.controllers.js/getCoursesById.controllers.js";
import {deleteCourse} from "../controllers/Course.controllers.js/deleteCourses.controllers.js";
import {updateCourseDetails} from "../controllers/Course.controllers.js/updateCoursesDetails.controllers.js";
import {getCourses} from "../controllers/Course.controllers.js/getCourses.controllers.js";
import {getUserCourses} from "../controllers/Course.controllers.js/getUserCourses.controllers.js";
import {addVideoToCourse} from "../controllers/Course.controllers.js/addVideotoCourses.controllers.js";
import {deleteVideoFromCourse} from "../controllers/Course.controllers.js/deleteVideoFromCourses.controllers.js";
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
export default router;