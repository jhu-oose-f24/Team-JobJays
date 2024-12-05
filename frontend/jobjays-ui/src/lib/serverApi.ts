
//const token = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTk1MiwidXNlcm5hbWUiOiJ0ZXM1NCIsImlhdCI6MTczMjk5NzE2OCwiZXhwIjoxNzMzMDgzNTY4fQ.4OGXlKo8ee0GSSsl_EY2nfB67k4Sqtkb4lu_IBFwUz4"
export async function getSavedJobsAPI(token: string | null) {
    console.log("TOKEN", token);
    const response = await fetch('https://muradazimzada.me/api/applicants/saved-jobs/collections', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response);

    if (!response.ok) {
        throw new Error('Failed to fetch saved jobs');
    }

    const data = await response.json();
    // console.log(token);
    // console.log("aowefowieoaeiawijaoweijawefoijaweoiawfoi");
    // const data = "McDonaldsCashier";
    return data;
}

export async function getAllJobsAPI(token: string | null) {
    console.log("YAHHHHHHHHHHHHHHWWHARTTTTTTTTTTT");
    const response = await fetch('https://muradazimzada.me/api/posts/public/jobs', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response);

    if (!response.ok) {
        throw new Error('Failed to fetch all jobs');
    }

    const data = await response.json();
    // console.log(token);
    // console.log("aowefowieoaeiawijaoweijawefoijaweoiawfoi");
    // const data = "McDonaldsCashier";
    return data;
}

export async function getSkillsAPI(token: string | null): Promise<string[]> {
    console.log("In getSkillsAPI");
    const response = await fetch('https://muradazimzada.me/api/applicants/profile/skills', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("getSkillsAPI response:", response);

    if (!response.ok) {
        throw new Error('Failed to fetch applicant skills');
    }

    const data = await response.json();
    console.log("Applicant skills data:", data);

    return data; // This should be an array of skills
}
