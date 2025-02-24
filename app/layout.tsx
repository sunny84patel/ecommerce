"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Ensure theme loads correctly on the client-side
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class">
          <Box display="flex">
            {isSidebarOpen && <Sidebar />}
            <Box flexGrow={1}>
              <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <Box p={3}>{mounted ? children : null}</Box>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
