
// My own canvas access token
// OAuth for canvas requires developer keys from a system admin, which I am not allowed access to as a student
import {Task} from "@/app/components/TaskCard";

export default async function GetCanvasTasks(token: string) {
    const res = await fetch(`https://issaquah.instructure.com/api/v1/courses?access_token=${token}&per_page=80`, {
        // Sends a GET request to the canvas API with my access token
        // Also uses per_page=80 because that should cover all courses the user is in. A student may take at most 8 classes
        // a year, so 32 classes over 4 years, for a total 64 classes. The additional 16 provide space for club and activity
        // courses to ensure the GET request returns all courses.
        method: "GET"
    })
    const courses: any[] = []; // Set up lists for courses and assignments
    const assignments: Task[] = [];
    const allCourses = await res.json(); // Retrieve all the courses, including ones for clubs etc. that will be eliminated
    let sem = "S1"
    for (const course of allCourses) {
        if (new Date().getMonth()+1 < 7) {
            sem = "S2"
        }
        if (course != undefined && course.course_code != undefined) { // Some entries returned undefined for an unknown reason, so let's check if it exists
            if (new Date(course.created_at) > new Date(new Date().setMonth(new Date().getMonth()+1-12)) && course.course_code.includes(sem)) {
                courses.push(course); // If a course for our current semester and current year has been found, write it down
            }
        }
    }
    for (const course of courses) { // For each course, find assignments
        const getAssignments = await fetch(`https://issaquah.instructure.com/api/v1/courses/${course.id}/assignments?access_token=${token}&order_by=due_at&bucket=upcoming`, {
            // Sends a GET request to the canvas API with my access token to get all assignments
            method: "GET"
        })
        const allAssignments = await getAssignments.json(); // Get ALL assigments, even ones past due
        for (const assignment of allAssignments) {
            if (new Date(assignment.due_at) > new Date()) {
                assignments.push({name: assignment.name, id: assignment.id, description: assignment.description, completed: false, due_date:assignment.due_at} as Task);
            }
        }
    }

    return Response.json({assignments}); // Return our list of assignments to be displayed on the front end.
}