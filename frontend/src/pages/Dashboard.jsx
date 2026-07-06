// import { useState } from "react";

// import DashboardLayout from "../components/layout/DashboardLayout";
// import EmailList from "../components/email/EmailList";

// // (We'll create these pages later)
// import Analytics from "../pages/Analytics";
// import Settings from "../pages/Settings";

// export default function Dashboard() {
//   // Current selected sidebar menu
//   const [activeMenu, setActiveMenu] = useState("INBOX");

//   return (
//     <DashboardLayout
//       activeMenu={activeMenu}
//       onMenuChange={setActiveMenu}
//     >
//       {activeMenu === "ANALYTICS" ? (
//         <Analytics />
//       ) : activeMenu === "SETTINGS" ? (
//         <Settings />
//       ) : (
//         <EmailList activeMenu={activeMenu} />
//       )}
//     </DashboardLayout>
//   );
// }

import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import EmailList from "../components/email/EmailList";
// import ComposeModal from "../components/email/ComposeModal";

import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("INBOX");
  const [showCompose, setShowCompose] = useState(false);

  function handleMenuChange(menu) {
    if (menu === "COMPOSE") {
      setShowCompose(true);
      return;
    }
    setActiveMenu(menu);
  }

  return (
    <>
      <DashboardLayout
        activeMenu={activeMenu}
        onMenuChange={handleMenuChange}
      >
        {activeMenu === "ANALYTICS" ? (
          <Analytics />
        ) : activeMenu === "SETTINGS" ? (
          <Settings />
        ) : (
          <EmailList activeMenu={activeMenu} />
        )}
      </DashboardLayout>

      {showCompose && (
        <ComposeModal onClose={() => setShowCompose(false)} />
      )}
    </>
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