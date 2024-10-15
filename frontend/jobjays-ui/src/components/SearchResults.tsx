import Link from 'next/link';
import {EmployerProfile} from "@/lib/types";
import React from "react";

interface JobPost {
    id: number;
    title: string;
    companyName: string;
    location: string;
}

interface SearchResultPageProps {
    searchResults: (JobPost | EmployerProfile)[] ;
}

const SearchResultsPage: React.FC<SearchResultPageProps> = ({ searchResults }) => {
    return (
        <div className="container mx-auto px-4 py-6">
            {/*<h1 className="text-2xl font-bold mb-4">Search Results</h1>*/}

            {/*{searchResults.length > 0 ? (*/}
            {/*    <ul className="space-y-4">*/}
            {/*        {searchResults.map((result) => (*/}
            {/*            <li key={result.id} className="bg-white shadow-md rounded-lg p-4">*/}
            {/*                <h2 className="text-xl font-semibold">{result.title}</h2>*/}
            {/*                <p className="text-gray-600">Company: {result.companyName}</p>*/}
            {/*                <p className="text-gray-500">Location: {result.location}</p>*/}

            {/*                /!* Link to the details page of the job post *!/*/}
            {/*                <Link href={`/jobs/${result.id}`}>*/}
            {/*                    <a className="text-blue-500 underline mt-2 inline-block">View Details</a>*/}
            {/*                </Link>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*) : (*/}
            {/*    <p className="text-gray-600">No results found.</p>*/}
            {/*)}*/}
        </div>
    );
};

export default SearchResultsPage;

// import Link from 'next/link';
// import {EmployerProfile} from "@/lib/types";
// import React from "react";
//
// interface JobPost {
//     id: number;
//     title: string;
//     companyName: string;
//     location: string;
// }
//
// interface SearchResultPageProps {
//     searchResults: (JobPost | EmployerProfile)[] ;
// }
//
// const SearchResultsPage: React.FC<SearchResultPageProps> = ({ searchResults }) => {
//     return (
//         <div className="container mx-auto px-4 py-6">
//             <h1 className="text-2xl font-bold mb-4">Search Results</h1>
//
//             {searchResults.length > 0 ? (
//                 <ul className="space-y-4">
//                     {searchResults.map((result) => (
//                         <li key={result.id} className="bg-white shadow-md rounded-lg p-4">
//                             <h2 className="text-xl font-semibold">{result.title}</h2>
//                             <p className="text-gray-600">Company: {result.companyName}</p>
//                             <p className="text-gray-500">Location: {result.location}</p>
//
//                             {/* Link to the details page of the job post */}
//                             <Link href={`/jobs/${result.id}`}>
//                                 <a className="text-blue-500 underline mt-2 inline-block">View Details</a>
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-600">No results found.</p>
//             )}
//         </div>
//     );
// };
//
// export default SearchResultsPage;
