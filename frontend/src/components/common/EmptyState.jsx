import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing Here",
  description = "No data available.",
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="bg-blue-50 p-6 rounded-full mb-6">

        <Icon
          size={50}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-2xl font-semibold text-gray-800">

        {title}

      </h2>

      <p className="mt-2 text-gray-500 text-center max-w-md">

        {description}

      </p>

    </div>
  );
}