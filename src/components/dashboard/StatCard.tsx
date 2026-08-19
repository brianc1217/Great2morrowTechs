interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
