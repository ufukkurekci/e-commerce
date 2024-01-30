import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";

const isAdmin = window.location.pathname.startsWith("/admin");

export const Layout = isAdmin ? AdminLayout : MainLayout; //  when isadmin is true Layout will be AdminLayout else Layout will be MainLayout