import Image from "next/image";

export default function Statistics() {
  const statistics = [
    {
      label: "Open Jobs",
      value: "1,075,324",
      iconSrc: "/main.jpg", // Add icons corresponding to each label
    },
    {
      label: "Companies",
      value: "97,354",
      iconSrc: "/icons/building.svg",
    },
    {
      label: "Candidates",
      value: "38,470,154",
      iconSrc: "/icons/user-group.svg",
    },
    {
      label: "Brand New Jobs",
      value: "170,532",
      iconSrc: "/icons/new-job.svg",
    },
  ];

  return (
    <section className="flex justify-center gap-8 p-8 bg-white">
      {statistics.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-6 bg-gray-50 border rounded-lg shadow-md w-48"
        >
          {/* Icon for each statistic
          <div className="mb-4">
            <Image src={stat.iconSrc} alt={`${stat.label} icon`} width={40} height={40} />
          </div> */}

          {/* Value */}
          <h3 className="text-3xl font-bold">{stat.value}</h3>

          {/* Label */}
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
