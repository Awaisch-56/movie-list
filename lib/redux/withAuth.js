"use client";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "./middleware";

export function withAuth(Component) {
  const WithAuth = (props) => {
    const [loading, setloading] = useState(true);
    const router = useRouter();
    useLayoutEffect(() => {
      const checkAuth = async () => {
        if (!isAuthenticated()) {
          localStorage.clear();
          router.push("/login");
        }
      };
      checkAuth();
      setTimeout(() => setloading(false), 500);
    }, [router]);
    return loading ? <></> : <Component {...props} />;
  };
  // Add a displayName to your HOC
  WithAuth.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithAuth;
}
