import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { RestaurantSearchResponse } from "./types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantSearchResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/api/restaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        setRestaurants(data.restaurants);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Auth0ProviderWithNavigate>
            <Toaster visibleToasts={1} position="top-right" richColors />
          </Auth0ProviderWithNavigate>
        </QueryClientProvider>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
