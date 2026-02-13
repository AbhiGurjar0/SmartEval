import React, { useState } from "react";
import {
  FaUserCog,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGlobeAmericas,
  FaUserTie,
  FaEdit,
  FaCheckCircle,
  FaCog,
  FaBell,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaFileAlt,
  FaSignOutAlt,
  FaCamera,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";

/**
 * AdminProfile - A modern, responsive admin profile page
 * Built with React + TailwindCSS. Fully customizable.
 */
const AdminProfile = () => {
  // ----- mock state for toggling follow/button (just for demo) -----
  const [isFollowing, setIsFollowing] = useState(false);

  // ----- admin user data (easily replace with props or API) -----
  const admin = {
    name: "Alexandra Morgan",
    role: "Senior System Administrator",
    email: "a.morgan@securecorp.io",
    phone: "+1 (415) 555-9876",
    location: "San Francisco, CA",
    joinDate: "March 2018",
    website: "admin.securecorp.io",
    bio: "Security-focused administrator with 10+ years in infrastructure and access governance. Leads the platform team and ensures zero-downtime deployments.",
    department: "IT Operations",
    reportsTo: "CTO",
    teamSize: "12 members",
    skills: ["AWS", "Kubernetes", "Terraform", "Zero Trust", "Node.js", "PostgreSQL"],
    stats: [
      { label: "Projects", value: "24", icon: FaBriefcase },
      { label: "Team", value: "12", icon: FaUsers },
      { label: "Reports", value: "156", icon: FaFileAlt },
      { label: "Uptime", value: "99.9%", icon: FaChartLine },
    ],
    recentActivity: [
      { action: "Deployed v2.4.1 to production", time: "2h ago", icon: FaCog },
      { action: "Reviewed 5 access requests", time: "5h ago", icon: FaShieldAlt },
      { action: "Updated firewall policies", time: "yesterday", icon: FaCheckCircle },
      { action: "Team lead meeting", time: "yesterday", icon: FaUsers },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 font-sans antialiased">
      {/* outer container — responsive max width */}
      <div className="max-w-6xl mx-auto">
        {/* Header with greeting and settings icon */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 flex items-center gap-2">
              <FaUserCog className="text-indigo-600 text-3xl" />
              Admin Profile
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-1">
              Dashboard / System / Administrators
            </p>
          </div>
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <button className="p-2.5 rounded-full bg-white shadow-sm text-slate-600 hover:text-indigo-600 hover:shadow transition-all border border-slate-200/80">
              <FaBell className="text-lg" />
            </button>
            <button className="p-2.5 rounded-full bg-white shadow-sm text-slate-600 hover:text-indigo-600 hover:shadow transition-all border border-slate-200/80">
              <FaCog className="text-lg" />
            </button>
            <button className="ml-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm shadow-indigo-200 transition">
              <FaEdit />
              Edit Profile
            </button>
          </div>
        </div>

        {/* main grid: left card (profile) + right column (stats + activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ---------- LEFT COLUMN: PROFILE CARD (extended) ---------- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
              {/* cover photo with avatar overlay */}
              <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="relative px-6 pb-6">
                {/* avatar — positioned over cover */}
                <div className="flex justify-between items-start -mt-12">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-xl bg-white p-1 shadow-lg">
                      <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-3xl font-bold">
                        AM
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-2 bg-white rounded-full p-1.5 shadow-md border border-slate-200 text-slate-600 hover:text-indigo-600 transition">
                      <FaCamera size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`mt-12 px-4 py-1.5 text-sm font-medium rounded-full shadow-sm transition flex items-center gap-1.5 ${
                      isFollowing
                        ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                    }`}
                  >
                    <FaUserTie size={14} />
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>

                {/* name & role */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    {admin.name}
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <FaCheckCircle size={12} /> verified
                    </span>
                  </h2>
                  <p className="text-indigo-600 font-medium text-sm mt-0.5 flex items-center gap-1.5">
                    <FaBriefcase className="text-xs" /> {admin.role}
                  </p>
                </div>

                {/* bio */}
                <p className="text-slate-600 text-sm mt-4 leading-relaxed border-t border-slate-100 pt-4">
                  {admin.bio}
                </p>

                {/* contact & meta grid */}
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-slate-600">
                    <FaEnvelope className="text-indigo-400 w-4" />
                    <a href={`mailto:${admin.email}`} className="hover:text-indigo-600 truncate">
                      {admin.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <FaPhoneAlt className="text-indigo-400 w-4" />
                    <span>{admin.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <FaMapMarkerAlt className="text-indigo-400 w-4" />
                    <span>{admin.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <FaCalendarAlt className="text-indigo-400 w-4" />
                    <span>Joined {admin.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <FaGlobeAmericas className="text-indigo-400 w-4" />
                    <a
                      href={`https://${admin.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-indigo-600 truncate"
                    >
                      {admin.website}
                    </a>
                  </div>
                </div>

                {/* department / reporting */}
                <div className="mt-5 bg-slate-50 rounded-xl p-4 text-sm border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Department</span>
                    <span className="font-medium text-slate-800">{admin.department}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-slate-500">Reports to</span>
                    <span className="font-medium text-slate-800">{admin.reportsTo}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-slate-500">Team size</span>
                    <span className="font-medium text-slate-800">{admin.teamSize}</span>
                  </div>
                </div>

                {/* skills tags */}
                <div className="mt-5">
                  <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-1">
                    <FaGraduationCap /> Core competencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {admin.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 rounded-full text-xs font-medium transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT COLUMN: STATS + ACTIVITY + SECURITY ---------- */}
          <div className="lg:col-span-2 space-y-6">
            {/* stats cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {admin.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md border border-slate-100 p-4 flex flex-col items-start transition hover:shadow-lg"
                >
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <stat.icon size={18} />
                  </div>
                  <p className="text-xl font-bold text-slate-800 mt-3">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* recent activity + quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* activity timeline */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-base border-b border-slate-100 pb-3">
                  <FaChartLine className="text-indigo-500" />
                  Recent activity
                </h3>
                <div className="mt-2 divide-y divide-slate-100">
                  {admin.recentActivity.map((item, i) => (
                    <div key={i} className="py-3 flex items-start gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600 text-sm">
                        <item.icon size={14} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{item.action}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-2 text-indigo-600 text-sm font-medium hover:text-indigo-800 transition flex items-center gap-1">
                  View all logs <span className="text-lg">→</span>
                </button>
              </div>

              {/* security status & quick links */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-base border-b border-slate-100 pb-3">
                  <FaShieldAlt className="text-indigo-500" />
                  Security overview
                </h3>
                <div className="mt-3 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">2FA</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <FaCheckCircle size={12} /> enabled
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Last login</span>
                    <span className="text-xs text-slate-600">Today, 09:24 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Active sessions</span>
                    <span className="text-xs text-slate-600">3 devices</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">API keys</span>
                    <span className="text-xs text-slate-600">2 active</span>
                  </div>
                </div>
                <button className="mt-5 w-full py-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 border border-slate-200">
                  <FaCog size={14} />
                  Security settings
                </button>
              </div>
            </div>

            {/* quick actions / admin shortcuts */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <FaUserTie size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Administrator access</p>
                  <p className="text-xs text-slate-400">Full system control · role: root</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition flex items-center gap-1.5">
                  <FaShieldAlt size={14} />
                  Permissions
                </button>
                <button className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-1.5 shadow-sm shadow-indigo-200">
                  <FaSignOutAlt size={14} />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* footer hint */}
        <div className="mt-8 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
          <span>Admin profile v2.0 · secured with RSA · last sync 2 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;