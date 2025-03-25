'use client'
import parse, {domToReact, HTMLReactParserOptions} from 'html-react-parser';

export interface Task {
    id: number;
    name: string,
    due_date: string,
    description: string,
    completed: boolean,
}

export default function TaskCard(props: Task) {

    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.name === 'h2') {
                return (
                    <h2 className="text-xl font-bold">
                        {domToReact(domNode.children, options)}
                    </h2>
                );
            }
            if (domNode.name === 'p') {
                return (
                    <>
                        <p className="text-sm m-0.5">
                        {domToReact(domNode.children, options)}
                        </p>
                        <br/>
                    </>
                );
            }
            if (domNode.name === 'li') {
                return (
                    <>
                        <li className="ml-4">
                            {domToReact(domNode.children, options)}
                        </li>
                        <br/>
                    </>
                );
            }
            if (domNode.name === 'ul') {
                return (
                    <>
                        <ul className="text-sm m-0.5">
                            {domToReact(domNode.children, options)}
                        </ul>
                        <br/>
                    </>
                );
            }
            if (domNode.name === 'a') {
                return (
                    <>
                        <a className="text-sm m-0.5 text-blue-600">
                            {domToReact(domNode.children, options)}
                        </a>
                        <br/>
                    </>
                );
            }
        }
    }

        return (
        <li className={"flex-auto min-w-full"}>
            <div className={"border-2 border-gray-400 rounded-lg m-4 text-left justify-items-start p-2 text-white"}>
                <h1 className={"text-center font-bold text-xl mb-2"}>
                    {props.name}
                </h1>
                <p>
                    {new Date(props.due_date).toLocaleDateString()}
                    <br/>
                    {new Date(props.due_date).toLocaleTimeString()}
                </p>
                <h3 className={"border-1 border-gray-300 p-2 rounded-lg mt-2"}>
                    {props.description? parse(props.description, options) : "There is no description for this assignment!"}
                </h3>
            </div>
        </li>
    )
}