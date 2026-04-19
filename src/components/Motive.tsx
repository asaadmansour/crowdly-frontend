import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { getCategories } from '../services/projects';

interface Category {
  id: number;
  name: string;
  project_count?: number;
}

// Emoji map — fallback to 🌐 for unknown categories
const CATEGORY_ICONS: Record<string, string> = {
  technology: '💻',
  tech: '💻',
  social: '🤝',
  education: '📚',
  environment: '🌿',
  health: '❤️',
  art: '🎨',
  arts: '🎨',
  music: '🎵',
  film: '🎬',
  food: '🍽️',
  community: '🏘️',
  sports: '⚽',
  science: '🔬',
  travel: '✈️',
  fashion: '👗',
  gaming: '🎮',
};

function categoryIcon(name: string): string {
  return CATEGORY_ICONS[name.toLowerCase()] ?? '🌐';
}

export default function Motive() {
  const ref = useReveal<HTMLDivElement>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((res) => {
        const data = res.data;
        const list: Category[] = Array.isArray(data) ? data : (data.results ?? []);
        setCategories(list);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-section home-section--alt" ref={ref}>
      <div className="home-section-inner">

        <div className="section-header-centered">
          <h2 className="reveal font-black text-3xl">Find What Moves You</h2>
          <p className="reveal body-md text-text-secondary mt-2 delay-100">
            Browse campaigns by category and discover causes that matter to you.
          </p>
        </div>

        <div className="motive-grid mt-10">
          {loading ? (
            /* Skeleton bubbles */
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="motive-bubble motive-bubble--skeleton skeleton-pulse" />
            ))
          ) : categories.length === 0 ? (
            <p className="home-empty">No categories found.</p>
          ) : (
            categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}/projects`}
                className="animate-fade-in-up motive-bubble"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="motive-icon">{categoryIcon(cat.name)}</span>
                <span className="motive-name">{cat.name}</span>
                {cat.project_count !== undefined && (
                  <span className="motive-count">{cat.project_count} projects</span>
                )}
              </Link>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
