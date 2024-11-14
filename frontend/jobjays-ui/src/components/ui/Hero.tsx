import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gray-100 p-12 pl-26 flex flex-row items-center justify-between ">
      {/* Left Content */}
      <div className="flex flex-col gap-5 max-w-md ml-12">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-geist-mono)]">Find a job that suits your interest & skills.</h1>
        <p className="text-gray-600">
          With our algorithms and unique use of artificial intelligence, JobJays allows you to find jobs that are tailored to just you!
        </p>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search jobs, companies, etc."
            className="px-4 py-2 border rounded-md flex-1"
          />
          <button className="px-4 py-2 bg-blue-400 text-white rounded-md">Find Job</button>
        </div>
        <p className="text-sm text-gray-500">
          Suggestion: Designer, Programmer, Digital Marketing, Video, Animation.
        </p>
      </div>

      {/* Right Content - Image */}
      <div className="flex-shrink-0 pr-8">
        <Image src="/student.webp" alt="Illustration" width={400} height={400} />
      </div>
    </section>
  );
}
