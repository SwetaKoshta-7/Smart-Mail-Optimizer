import DashboardLayout from "../components/layout/DashboardLayout";
import EmailList from "../components/email/EmailList";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <EmailList />
    </DashboardLayout>
  );
}



// ├── ai/
// │     ├── AISummaryCard.jsx
// │     ├── SmartSuggestions.jsx
// │     ├── PriorityIndicator.jsx
// │     └── SpamPrediction.jsx
// │
// ├── compose/
// │     ├── ComposeModal.jsx
// │     └── AttachmentUploader.jsx
// │
// ├── notifications/
// │     ├── NotificationBell.jsx
// │     └── NotificationDropdown.jsx