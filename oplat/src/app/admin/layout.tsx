import Header from "@/components/ui/adminPage/header";
import SidebarAdminPage from "@/components/ui/adminPage/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <Header />
        <main className="w-full md:w-3/4 mx-auto flex justify-center items-center p-4 md:p-10 box-border">
        <SidebarAdminPage /> 
          {children} 
        </main>
      </body>
    </html>
  );
}