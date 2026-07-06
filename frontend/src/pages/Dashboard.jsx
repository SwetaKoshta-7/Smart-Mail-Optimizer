// import DashboardLayout from "../components/layout/DashboardLayout";
// import EmailList from "../components/email/EmailList";

// export default function Dashboard() {
//   return (
//     <DashboardLayout>
//       <EmailList />
//     </DashboardLayout>
//   );
// }

import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import EmailList from "../components/email/EmailList";

// (We'll create these pages later)
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

export default function Dashboard() {
  // Current selected sidebar menu
  const [activeMenu, setActiveMenu] = useState("INBOX");

  return (
    <DashboardLayout
      activeMenu={activeMenu}
      onMenuChange={setActiveMenu}
    >
      {activeMenu === "ANALYTICS" ? (
        <Analytics />
      ) : activeMenu === "SETTINGS" ? (
        <Settings />
      ) : (
        <EmailList activeMenu={activeMenu} />
      )}
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