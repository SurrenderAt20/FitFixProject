import { useEffect, useState } from "react";

const useSession = (req) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId: req.session.id }),
          credentials: "include",
        });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    checkSession();
  }, [req.session.id]);

  return [isLoggedIn, isLoading];
};

export default useSession;
