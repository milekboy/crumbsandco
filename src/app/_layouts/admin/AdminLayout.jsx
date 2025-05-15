import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";
export default function AdminLayout({ children }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 px-4 ">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
