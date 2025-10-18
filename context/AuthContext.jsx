// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   // Check cookies on load
//   useEffect(() => {
//     const token = Cookies.get("token");
//     const username = Cookies.get("username");
//     if (token && username) {
//       setUser({ token, username });
//     }
//   }, []);

//   const login = (token, username) => {
//     Cookies.set("token", token, { expires: 7 }); // 7 days
//     Cookies.set("username", username, { expires: 7 });
//     setUser({ token, username });
//     router.push("/");
//   };

//   const logout = () => {
//     Cookies.remove("token");
//     Cookies.remove("username");
//     setUser(null);
//     router.push("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // lightweight cookie library
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null); // { username, token, roles }

  // Restore user from cookie on mount
  useEffect(() => {
    const cookieData = Cookies.get("auth");
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        setUser(parsed);
      } catch (err) {
        console.error("Failed to parse auth cookie", err);
      }
    }
  }, []);

  // Login function: save user info to state and cookie
  const login = ({ username, token, is_sponsor, is_guest, is_child }) => {
    const userData = { username, token, is_sponsor, is_guest, is_child };
    setUser(userData);
    Cookies.set("auth", JSON.stringify(userData), { expires: 7 }); // cookie lasts 7 days
  };

  // Logout function: clear state and cookie
  const logout = () => {
    setUser(null);
    Cookies.remove("auth");
    router.push("/login"); // redirect to login page
  };

  const value = { user, login, logout, isLoggedIn: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for easy use in components
export const useAuth = () => useContext(AuthContext);
