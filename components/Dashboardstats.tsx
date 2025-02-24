import { FaUsers, FaShoppingCart, FaBox, FaStar } from "react-icons/fa";
import { Box, Typography } from "@mui/material";

const stats = [
  { title: "Total Users", value: 4458, icon: <FaUsers />, color: "bg-green-500" },
  { title: "Total Orders", value: 238, icon: <FaShoppingCart />, color: "bg-purple-500" },
  { title: "Total Products", value: 106, icon: <FaBox />, color: "bg-blue-500" },
  { title: "Total Reviews", value: 188, icon: <FaStar />, color: "bg-yellow-500" },
];

export default function DashboardStats() {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={2}>
      {stats.map((stat, index) => (
        <Box
          key={index}
          className={`${stat.color} rounded-lg p-4 flex items-center justify-between w-60 shadow-lg text-white`}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {stat.title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {stat.value}
            </Typography>
          </Box>
          <Box className="opacity-50 text-4xl">{stat.icon}</Box>
        </Box>
      ))}
    </Box>
  );
}
