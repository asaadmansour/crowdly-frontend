import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

export default function Categories() {
  const { categories, loadingCategories } = useCategories();

  if (loadingCategories) {
    return (
      <div className="min-h-screen bg-[#f7f3ed] p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="mb-3 h-10 w-52 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-40 animate-pulse rounded bg-neutral-200" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="h-64 animate-pulse bg-neutral-200" />
                <div className="p-5">
                  <div className="mb-3 h-6 w-24 animate-pulse rounded bg-neutral-200" />
                  <div className="mb-2 h-4 w-full animate-pulse rounded bg-neutral-200" />
                  <div className="mb-2 h-4 w-4/5 animate-pulse rounded bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Browse Categories
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">Categories</h1>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Choose a category to explore its projects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}/projects`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-64 bg-gradient-to-br from-orange-100 via-orange-50 to-neutral-200" />
              <div className="p-5">
                <h2 className="mb-2 text-2xl font-bold text-black">{category.name}</h2>
                <p className="text-sm leading-6 text-gray-600">
                  {category.description || 'Explore projects in this category.'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
