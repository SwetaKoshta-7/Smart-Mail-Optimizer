import {
  Mail,
  Inbox,
  CircleAlert,
  MailOpen,
  Send,
  ShieldAlert,
  Trash2,
  BarChart3,
  Settings,
  PenSquare,
  ChevronDown,
  Tag,
  Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import emailService from "../../services/emailService";

const menuBase = [
  { name: "Inbox", icon: Inbox, label: "INBOX" },
  { name: "Important", icon: CircleAlert, label: "IMPORTANT" },
  { name: "Unread", icon: MailOpen, label: "UNREAD" },
  { name: "Sent", icon: Send, label: "SENT" },
  { name: "Spam", icon: ShieldAlert, label: "SPAM" },
  { name: "Trash", icon: Trash2, label: "TRASH" },
];

export default function Sidebar({ activeMenu, onMenuChange }) {
  const { user } = useAuth();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    emailService.getCounts().then(setCounts).catch(() => {});
  }, [activeMenu]); // refetch when switching folders, so counts stay fresh

  const menu = menuBase.map((item) => ({
    ...item,
    badge: counts[item.label] || undefined,
  }));

    const labels = [
        "Work",
        "Personal",
        "Finance",
        "Subscriptions",
        "Social",
    ];

    return (

        <aside className="h-full flex flex-col bg-white">

            {/* Logo */}

            <div className="flex items-center gap-3 px-6 py-6 border-b">

                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">

                    <Mail className="text-white" size={24} />

                </div>

                <div>

                    <h1 className="text-xl font-bold text-slate-800">
                        Smart Mail
                    </h1>

                    <p className="text-sm text-gray-500">
                        Optimizer
                    </p>

                </div>

            </div>

            {/* Compose */}

            <div className="px-5 py-5">

                <button
                  onClick={() => onMenuChange("COMPOSE")}
                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-4 flex items-center justify-between px-5 transition">

                    <div className="flex items-center gap-3">

                        <PenSquare size={20}/>

                        Compose

                    </div>

                    <ChevronDown size={18}/>

                </button>

            </div>

            {/* Menu */}

            <nav className="px-3 flex-1 overflow-y-auto">

                {menu.map((item)=>{

                    const Icon=item.icon;

                    const active=activeMenu===item.label;

                    return(

                        <button
                            key={item.label}
                            onClick={()=>onMenuChange(item.label)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 transition
                            ${
                                active
                                ? "bg-blue-600 text-white shadow-md font-semibold"
                                : "hover:bg-blue-50 hover:text-blue-600"
                            }`}>

                            <div className="flex items-center gap-3">

                                <Icon size={20}/>

                                {item.name}

                            </div>

                            {item.badge &&

                                <span className={`${
                                    active
                                      ? "bg-white/20 text-white"
                                      : "bg-gray-100 text-gray-600"
                                  } rounded-lg px-2 py-1 text-xs`}>

                                    {item.badge}

                                </span>

                            }

                        </button>

                    )

                })}

                <hr className="my-5"/>

                <button
                    onClick={()=>onMenuChange("ANALYTICS")}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl
                    ${
                        activeMenu==="ANALYTICS"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}>

                    <div className="flex gap-3 items-center">

                        <BarChart3 size={20}/>

                        Analytics

                    </div>

                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-lg">

                        New

                    </span>

                </button>

                <button
                    onClick={()=>onMenuChange("SETTINGS")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-2
                    ${
                        activeMenu==="SETTINGS"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}>

                    <Settings size={20}/>

                    Settings

                </button>

                {/* Labels */}

                <div className="mt-6">

                    <div className="flex items-center justify-between px-4 mb-3">

                        <div className="flex gap-2 items-center">

                            <Tag size={18}/>

                            Labels

                        </div>

                        <button
                            className="text-blue-600 hover:text-blue-700 font-bold"
                        >
                            +
                        </button>

                    </div>

                    {labels.map((label,index)=>{

                        const colors=[
                            "bg-blue-500",
                            "bg-green-500",
                            "bg-yellow-400",
                            "bg-purple-500",
                            "bg-pink-500",
                        ];

                        return(

                            <div
                                key={label}
                                className="flex items-center gap-3 px-5 py-2 text-gray-600">

                                <div className={`w-3 h-3 rounded-full ${colors[index]}`}/>

                                {label}

                            </div>

                        )

                    })}

                </div>

            </nav>

            {/* Upgrade */}

            <div className="p-5">

                <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-white p-5">

                    <div className="flex gap-2 items-center text-blue-700 font-semibold">

                        <Sparkles size={18}/>

                        Upgrade to Pro

                    </div>

                    <p className="text-sm text-gray-500 mt-3">

                        Unlock AI categorization, analytics,
                        summaries and smart replies.

                    </p>

                    <button
                      onClick={() => alert("Upgrade feature coming soon")}
                      className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition"
                  >
                      Upgrade Now
                  </button>

                </div>

                <div className="mt-5">

                    <div className="flex justify-between text-xs text-gray-500">

                        <span>2.7 GB</span>

                        <span>15 GB</span>

                    </div>

                    <div className="h-2 rounded-full bg-gray-200 mt-2">

                        <div className="w-[18%] h-full bg-blue-600 rounded-full"/>

                    </div>

                </div>

            </div>

            <div className="border-t px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`}
                  className="w-11 h-11 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user?.name || "Loading..."}</p>
                  <p className="text-sm text-gray-500">Connected</p>
                </div>
              </div>
            </div>

        </aside>

    )

}