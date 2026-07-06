const styles = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function PriorityBadge({ priority = "Low" }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[priority] || styles.Low}`}>
      {priority}
    </span>
  );
}