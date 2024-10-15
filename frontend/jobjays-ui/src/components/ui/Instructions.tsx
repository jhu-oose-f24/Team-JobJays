import Image from "next/image";

const steps = [
  {
    icon: "/main.jpg", // replace with better icons
    title: "Account",
    description: "Sign up for the necessary role and personalize your user profile.",
  },
  {
    icon: "/main.jpg",
    title: "Notifications",
    description: "After editing your profile, you can receive personalized notifications on job postings you might be interested in",
  },
  {
    icon: "/main.jpg",
    title: "Search",
    description: "Look for the opportunities you desire using the various filters. You can also use our AI feature that can help you pick the best job for you",
  },
  {
    icon: "/main.jpg",
    title: "Apply",
    description: "Apply to any position you want to after searching!",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-100">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">How Can You Use JobJays?</h2>
      </div>

      {/* Steps container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-md relative max-w-sm">

            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-blue-100 rounded-full">
              <Image src={step.icon} alt={step.title} width={40} height={40} />
            </div>

            <h3 className="text-xl font-bold mb-2">{step.title}</h3>

            <p className="text-gray-600">{step.description}</p>

          </div>
        ))}
      </div>
    </section>
  );
}
