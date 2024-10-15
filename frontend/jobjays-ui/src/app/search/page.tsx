"use client";  // Add this directive at the top

import React from "react";
import SearchResults from "@/components/SearchResults";
import {NextRequest} from "next/server";


const MySearchPage = (request:NextRequest) => {

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    return <SearchResults searchResults={[]}/>;
};

export default MySearchPage;
