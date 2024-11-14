import {Suspense} from "react";
import Search from "@/components/ui/Search";

const ListJobPage = () => {

        return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Search />
            </Suspense>
        </>
        );
    };
    
    export default ListJobPage;

