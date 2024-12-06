# Improvements and Refactorings

One improvement we made was removing the login and register functions from the Employer and Applicant controllers and into a segregated AuthController. This improvement was needed since the other controllers became too cluttered and were filled with many responsibilities. Thus, as a result of this change, our code improves a lot in terms of adhering to the single responsibility design principle.

Another improvement we made was getting rid of repetitive API calls in across different components in the application and instead moving them all to one central api.ts file. Here we defined all the API functions that we need to use across the application and as a result, the code became much cleaner. In addition, this improvement helped us be rid of the duplicate code smell which is great to see.

Another important improvement we made was straying away from a single Applicant class/model and instead having things like ApplicantPreferences, ApplicantProfile, ApplicantResume, and more. This was also done for the Employer side of things among others. Not only was this important to reduce clutter in our files, but it helps us adhere to design principles/patterns and avoid code smells. For one, these improvements help us adhere to the single responsibility principle and open-closed principle. It also increases the cohesion between each class while also getting rid of the large class code smell.

Contributions
* Ahmed: worked on moving login/register functionality into Auth, worked on moving API functions to one file
* Enoch: worked on moving login/register functionality into Auth, worked on moving API functions to one file
* Murad: worked on separating Applicant/Employer responsibilities into smaller classes/models, worked on improving backend directory structure for easier development
* Sam: worked on moving API functions to one file, worked on separating Applicant/Employer responsibilities into smaller classes/models
* Loren: worked on separating Applicant/Employer responsibilities into smaller classes/models
* Gavin: worked on separating Applicant/Employer responsibilities into smaller classes/models