
const token = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTk1MiwidXNlcm5hbWUiOiJ0ZXM1NCIsImlhdCI6MTczMjk5NzE2OCwiZXhwIjoxNzMzMDgzNTY4fQ.4OGXlKo8ee0GSSsl_EY2nfB67k4Sqtkb4lu_IBFwUz4"
export async function getSavedJobsAPI() {
    const response = await fetch('http://localhost:8080/api/applicants/profile/saved-jobs', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch saved jobs');
    }

    const data = await response.json();
    // console.log(token);
    // console.log("aowefowieoaeiawijaoweijawefoijaweoiawfoi");
    // const data = "McDonaldsCashier";
    return data;
}