"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";


export default function ErrorPage() {
    const router = useRouter();
    const handleClickHome = () => {
        router.push("/");
    };
    const handleClickSignIn = () => {
        router.push("/signin");
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <h1 className="text-4xl font-bold text-red-500">Not Found (404)</h1>
            <p className="text-lg text-gray-600">
                Oops! You do not have access to this resource.
            </p>

            <Button onClick={handleClickHome}>Go Home</Button>
            <Button onClick={handleClickSignIn}>SignIn</Button>
        </div>
    );
}