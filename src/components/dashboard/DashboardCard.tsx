type DashboardCardProps = {
  title: string;
  value: string | number;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white shadow-md p-6">
      <h3 className="text-slate-500 text-sm uppercase">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}