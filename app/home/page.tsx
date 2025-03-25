import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import SignOutButton from "@/app/home/SignOutButton";
import getCanvasTasks from "@/app/home/GetCanvasTasks"
import TaskCard, {Task} from "@/app/components/TaskCard";
import PomodoroTimer from "@/app/components/PomodoroTimer";
import {db} from "@/app/lib/db";

export default async function Home() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }
    const tokenJSON = db.prepare(`SELECT token from usertable where username=?`).get(session.user.username)
    // @ts-expect-error Type of tokenJSON is JSON but because it is not identified it cannot be used without error
    const token = tokenJSON.token;
    const res = await getCanvasTasks(token)
    const {assignments} = await res.json()

    return (
        <div className="min-h-screen bg-gray-700">
            <header className="bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Canvas Tasks Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        {session?.user?.name && (
                            <span className="text-gray-600">Welcome, {session.user.name}</span>
                        )}
                        <SignOutButton />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="border-b border-gray-200 bg-gray-800 px-6 py-4">
                            <h2 className="text-xl font-semibold text-white">Assignments</h2>
                        </div>
                        <div className="p-6">
                            {assignments && assignments.length > 0 ? (
                                <ul>
                                    {assignments.map((task: Task) => (
                                        <TaskCard
                                            key={task.id}
                                            id={task.id}
                                            name={task.name}
                                            due_date={task.due_date}
                                            description={task.description}
                                            completed={task.completed}
                                        />
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-white text-center py-8">No assignments available.</p>
                            )}
                        </div>
                    </div>
                    <PomodoroTimer/>
                </div>
            </main>
        </div>
    );
}