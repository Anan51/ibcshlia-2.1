'use client'
import {useEffect, useState} from "react";

export default function PomodoroTimer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
                else {
                    // Timer completed
                    clearInterval(interval!);

                    // Toggle between focus and break
                    if (isBreak) {
                        // Break finished, start focus time
                        setIsBreak(false);
                        setMinutes(25);
                        setSeconds(0);
                    } else {
                        // Focus finished, start break time
                        setIsBreak(true);
                        setMinutes(5);
                        setSeconds(0);
                    }

                    // Keep the timer running when switching modes
                    setIsRunning(true);
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, minutes, seconds, isBreak]);

    // Handle start/pause button
    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    // Handle reset button
    const resetTimer = () => {
        setIsRunning(false);
        setIsBreak(false);
        setMinutes(25);
        setSeconds(0);
    };
    const displayTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Pomodoro Timer</h2>
            </div>

            <div className="p-6 flex flex-col items-center">
                <div className="w-48 h-48 rounded-full ${isBreak ? 'border-green-300' : 'border-blue-300'} border-8 border-white flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-bold text-blue-600 ${isBreak ? 'text-green-500' : 'text-blue-500'}">{displayTime}</h1>
                </div>

                <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={toggleTimer}>
                        Start
                    </button>
                    <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" onClick={resetTimer}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}