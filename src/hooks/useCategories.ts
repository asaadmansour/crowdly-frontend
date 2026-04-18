import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  description?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/projects/categories/`);
        const data = await res.json();

        console.log("BASE_URL:", BASE_URL);
        console.log("categories response:", data);

        setCategories(data);
      } catch (err) {
        console.error("categories error:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loadingCategories };
};