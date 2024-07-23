// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const fetchUsers = async () => {
//   const { data } = await axios.get("/api/auth/users");
//   return data;
// };

// const Dashboard = () => {
//   const {
//     data: users,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: fetchUsers,
//     refetchOnWindowFocus: false,
//     staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
//     refetchInterval: false, // Disable periodic refetching
//   });

//   if (isLoading) {
//     return <p>Loading users...</p>;
//   }

//   if (error) {
//     return <p>Error fetching users</p>;
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Navbar */}
//       <header className="bg-white shadow-lg">
//         <div className="container mx-auto px-6 py-3">
//           <div className="flex items-center justify-between">
//             <div className="hidden w-full text-gray-600 md:flex md:items-center">
//               {/* Left side */}
//               <div className="flex items-center">
//                 <span className="mr-3 text-xl font-bold">
//                   Library Management System
//                 </span>
//               </div>
//             </div>

//             {/* Right side */}
//             <div className="w-full flex items-center justify-end">
//               <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//                   <button
//                     type="submit"
//                     className="p-1 focus:outline-none focus:shadow-outline"
//                   >
//                     <svg
//                       className="w-4 h-4"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 12a2 2 0 100-4 2 2 0 000 4z"
//                         clipRule="evenodd"
//                       />
//                       <path
//                         fillRule="evenodd"
//                         d="M17.95 11.293a8.947 8.947 0 10-1.414 1.414l4.243 4.243a1 1 0 101.414-1.414l-4.243-4.243z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </span>
//                 <input
//                   type="text"
//                   className="w-full py-2 text-sm text-gray-700 rounded pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
//                   placeholder="Search..."
//                 />
//               </div>

//               {/* Avatar */}
//               <div className="relative">
//                 <button className="flex items-center focus:outline-none mr-3">
//                   <img
//                     className="rounded-full w-8 h-8"
//                     src="https://randomuser.me/api/portraits/women/17.jpg"
//                     alt="Avatar"
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="my-8 flex flex-col">
//         <div className="mx-auto px-4 sm:px-8 py-4 sm:py-6 w-full max-w-7xl">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Admin Dashboard
//           </h1>
//           <p className="mt-2 text-sm text-gray-600">
//             Welcome to the admin dashboard.
//           </p>

//           {/* Users list */}
//           {isLoading ? (
//             <p>Loading users...</p>
//           ) : error ? (
//             <p>Error fetching users</p>
//           ) : (
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold text-gray-700">Users</h2>
//               <ul className="mt-4">
//                 { {users.map((user) => ( }
//                   <li
//                     key={user.id}
//                     className="p-4 bg-white rounded shadow mb-2"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-lg font-medium">
//                           {user.display_name}
//                         </p>
//                         <p className="text-sm text-gray-600">{user.email}</p>
//                         <p className="text-sm text-gray-600">
//                           Role: {user.role}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600">
//                           {user.mobile_number}
//                         </p>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white text-center text-xs py-2">
//         Library Management System &copy; 2024
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;
