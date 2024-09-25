import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {sampleProfile} from "@/lib/data";

export default function ProfileCard() {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto">
            <div className="flex items-center">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                </Avatar>
                <div className="ml-4">
                    <h1 className="text-xl font-bold">User Name and Last</h1>
                    <p className="text-gray-500">User Bio </p>
                </div>
            </div>
            <div className="mt-4">
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                    Connect
                </button>
            </div>
        </div>
    )
}