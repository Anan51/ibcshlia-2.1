
import {redirect} from "next/navigation";


export default function Home() {
    return (
        <div>
            <div className={"grid grid-cols-4 gap-4 m-4 grow"}>
                <div className={"col-start-1 col-span-1 flex-auto text-center ml-2 border-4 border-cyan-200"}> # Music Widget</div>
                <div className={"col-start-2 col-span-2 flex-auto justify-items-center text-center border-4 border-cyan-200"}> # Task Card</div>
                <div className={"col-start-4 col-span-1 flex-auto text-center mr-2 border-4 border-cyan-200"}> # Pomodoro Widget</div>
            </div>
        </div>
    );
}
