interface PageHeaderProps {
  title: string;
  subtitle?: string;

  actionText?: string;
  onAction?: () => void;
}

export default function PageHeader({
  title,
  subtitle,
  actionText,
  onAction,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}