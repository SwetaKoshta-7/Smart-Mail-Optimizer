import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import EmailList from "../components/email/EmailList";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("INBOX");

  return (
    <DashboardLayout
      activeMenu={activeMenu}
      onMenuChange={setActiveMenu}
    >
      <EmailList activeMenu={activeMenu} />
    </DashboardLayout>
  );
}