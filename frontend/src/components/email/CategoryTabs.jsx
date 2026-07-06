import {
  Inbox,
  Users,
  Tag,
  Bell,
  Briefcase,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    id: "all",
    label: "All",
    icon: Inbox,
  },
  {
    id: "primary",
    label: "Primary",
    icon: Inbox,
  },
  {
    id: "social",
    label: "Social",
    icon: Users,
  },
  {
    id: "promotions",
    label: "Promotions",
    icon: Tag,
  },
  {
    id: "updates",
    label: "Updates",
    icon: Bell,
  },
  {
    id: "work",
    label: "Work",
    icon: Briefcase,
  },
  {
    id: "ai",
    label: "AI Priority",
    icon: Sparkles,
  },
];

export default function CategoryTabs({
  selectedCategory,
  onCategoryChange,
  emails = [],
}) {
  const getCount = (category) => {
    if (category === "all") return emails.length;

    if (category === "ai") {
      return emails.filter(
        (email) =>
          email.priority === "High" ||
          email.ai_summary
      ).length;
    }

    return emails.filter(
      (email) =>
        email.category?.toLowerCase() === category
    ).length;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-5 overflow-x-auto">

      <div className="flex min-w-max">

        {categories.map((category) => {

          const Icon = category.icon;

          const active =
            selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() =>
                onCategoryChange(category.id)
              }
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition whitespace-nowrap

              ${
                active
                  ? "border-blue-600 text-blue-600 bg-blue-50 font-semibold"
                  : "border-transparent text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />

              <span>
                {category.label}
              </span>

              <span
                className={`text-xs rounded-full px-2 py-0.5

                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {getCount(category.id)}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}