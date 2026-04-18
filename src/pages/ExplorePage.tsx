import { useState, useEffect, useCallback } from 'react';
import { getProjects, getCategories } from '../services/projects';
import ProjectCard from '../components/ProjectCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import './ExplorePage.css';

interface ActiveFilter {
  label: string;
  onRemove: () => void;
}

interface Category {
  id: number;
  name: string;
  project_count?: number;
}

interface Project {
  id: number;
  title: string;
  details: string;
  category?: Category;
  total_target: number | string;
  total_donated: number | string;
  end_time: string;
  average_rating?: number;
  donor_count?: number;
  creator?: string;
  images?: { image: string }[];
}

export default function ExplorePage() {
  // ── Data state ─────────────────────────────────────────────────────────────
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);

  // ── Filter state ───────────────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [status, setStatus] = useState('');
  const [maxGoal, setMaxGoal] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [ordering, setOrdering] = useState('-created_at');

  // ── Debounce search ────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Fetch categories once ──────────────────────────────────────────────────
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data?.results ?? res.data ?? []))
      .catch(() => setCategories([]));
  }, []);

  // ── Fetch projects whenever any filter changes ─────────────────────────────
  // Track the current page in a ref so fetchProjects can read it without it
  // appearing in useCallback deps (which would cause a double-call on page change).
  const pageRef = { current: page };
  pageRef.current = page;

  const fetchProjects = useCallback(
    async (resetPage = true) => {
      const currentPage = resetPage ? 1 : pageRef.current;
      if (resetPage) {
        setIsLoading(true);
        setPage(1);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const params: Record<string, unknown> = {
          search: debouncedSearch || undefined,
          category: selectedCategories[0] ?? undefined,
          status: status || undefined,
          ordering,
          page: currentPage,
          // Goal range — only send when the slider is below the max
          ...(maxGoal < 100000 ? { max_goal: maxGoal } : {}),
          // Rating — only send when a minimum star rating is selected
          ...(minRating > 0 ? { min_rating: minRating } : {}),
        };
        // Strip undefined keys before sending
        Object.keys(params).forEach((k) => params[k] === undefined && delete params[k]);

        const res = await getProjects(params);
        const data = res.data;
        setTotalCount(data.count ?? 0);
        setNextPage(data.next ?? null);

        if (resetPage) {
          setProjects(data.results ?? []);
        } else {
          setProjects((prev) => [...prev, ...(data.results ?? [])]);
          setPage((p) => p + 1);
        }
      } catch {
        if (resetPage) setProjects([]);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    // page is intentionally excluded — read via ref to prevent re-render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearch, selectedCategories, status, maxGoal, minRating, ordering]
  );

  // Re-fetch whenever any filter changes (fetchProjects encodes all filter deps)
  useEffect(() => {
    fetchProjects(true);
  }, [fetchProjects]);

  // ── Load more ──────────────────────────────────────────────────────────────
  const loadMore = () => fetchProjects(false);

  // ── Clear filters ──────────────────────────────────────────────────────────
  const clearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setSelectedCategories([]);
    setStatus('');
    setMaxGoal(100000);
    setMinRating(0);
    setOrdering('-created_at');
  };

  // ── Toggle category ────────────────────────────────────────────────────────
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [id]));
  };

  // ── Active filter pills ────────────────────────────────────────────────────
  const activeFilters: ActiveFilter[] = [];

  selectedCategories.forEach((catId) => {
    const cat = categories.find((c) => c.id === catId);
    if (cat) {
      activeFilters.push({
        label: cat.name.toUpperCase(),
        onRemove: () => setSelectedCategories((prev) => prev.filter((id) => id !== catId)),
      });
    }
  });

  if (status) {
    activeFilters.push({
      label: status.toUpperCase(),
      onRemove: () => setStatus(''),
    });
  }

  if (minRating > 0) {
    activeFilters.push({
      label: `${minRating}★ & ABOVE`,
      onRemove: () => setMinRating(0),
    });
  }

  if (maxGoal < 100000) {
    activeFilters.push({
      label: `GOAL ≤ $${(maxGoal / 1000).toFixed(0)}K`,
      onRemove: () => setMaxGoal(100000),
    });
  }

  // ── Sort label map ─────────────────────────────────────────────────────────
  const orderingOptions = [
    { value: '-created_at', label: 'Most Recent' },
    { value: 'created_at', label: 'Oldest' },
    { value: '-total_donated', label: 'Most Funded' },
    { value: 'total_donated', label: 'Least Funded' },
    { value: '-average_rating', label: 'Highest Rated' },
  ];

  const shown = projects.length;
  const remaining = Math.max(0, totalCount - shown);

  return (
    <div className="explore-page">
      {/* ── Sidebar ── */}
      <aside className="explore-sidebar">
        <div className="sidebar-card">
          {/* Header */}
          <div className="sidebar-header">
            <h2 className="sidebar-title">Filters</h2>
            <p className="sidebar-subtitle">REFINE YOUR DISCOVERY</p>
          </div>

          {/* Keyword Search */}
          <div className="filter-section">
            <input
              id="explore-search"
              type="text"
              className="filter-search-input"
              placeholder="Keyword search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="filter-section">
            <p className="filter-label">CATEGORY</p>
            <ul className="category-list">
              {categories.map((cat: Category) => (
                <li key={cat.id} className="category-item">
                  <label className="category-label">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                    />
                    <span className="category-name">{cat.name}</span>
                  </label>
                  <span className="category-count">{cat.project_count ?? ''}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="filter-section">
            <p className="filter-label">STATUS</p>
            <div className="select-wrapper">
              <select
                id="explore-status"
                className="filter-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="running">Running</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <span className="select-arrow">▾</span>
            </div>
          </div>

          {/* Goal Range */}
          <div className="filter-section">
            <div className="filter-label-row">
              <p className="filter-label">GOAL RANGE</p>
              <span className="filter-range-value">
                ${'0'} – ${maxGoal >= 100000 ? '100K' : `${(maxGoal / 1000).toFixed(0)}K`}
              </span>
            </div>
            <input
              id="explore-goal-range"
              type="range"
              className="filter-range"
              min={0}
              max={100000}
              step={5000}
              value={maxGoal}
              onChange={(e) => setMaxGoal(Number(e.target.value))}
            />
          </div>

          {/* Rating */}
          <div className="filter-section">
            <p className="filter-label">RATING</p>
            <ul className="rating-list">
              {[
                { value: 5, label: '5★ & Up' },
                { value: 4, label: '4★ & Up' },
                { value: 3, label: '3★ & Up' },
                { value: 0, label: 'All Ratings' },
              ].map((opt) => (
                <li key={opt.value} className="rating-item">
                  <label className="rating-label">
                    <input
                      type="radio"
                      className="filter-radio"
                      name="rating"
                      checked={minRating === opt.value}
                      onChange={() => setMinRating(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Clear All */}
          <button className="clear-filters-btn" onClick={clearFilters}>
            CLEAR ALL FILTERS
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="explore-main">
        {/* Title & subtitle */}
        <h1 className="explore-title">Explore Projects</h1>
        <p className="explore-subtitle">
          Showing {shown} campaign{totalCount !== 1 ? 's' : ''} matching your curation
        </p>

        {/* Sort + pills row */}
        <div className="explore-toolbar">
          {/* Active pills */}
          {activeFilters.length > 0 && (
            <div className="active-pills">
              {activeFilters.map((f) => (
                <span key={f.label} className="filter-pill">
                  {f.label}
                  <button
                    className="pill-remove"
                    onClick={f.onRemove}
                    aria-label={`Remove filter ${f.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Sort control — pushed to right */}
          <div className="sort-control">
            <span className="sort-label">SORT BY</span>
            <div className="select-wrapper">
              <select
                id="explore-ordering"
                className="filter-select sort-select"
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                {orderingOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="select-arrow">▾</span>
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="project-grid">
          {isLoading ? (
            <LoadingSkeleton count={12} />
          ) : projects.length === 0 ? (
            <EmptyState
              title="No projects found"
              message="Try adjusting your filters or search term."
              actionLabel="Clear filters"
              onAction={clearFilters}
            />
          ) : (
            projects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                details={project.details}
                category={project.category?.name ?? ''}
                total_target={Number(project.total_target)}
                total_donated={Number(project.total_donated)}
                end_time={project.end_time}
                rating={project.average_rating ?? 0}
                donor_count={project.donor_count ?? 0}
                creator_name={project.creator ?? ''}
                image={project.images?.[0]?.image}
              />
            ))
          )}
        </div>

        {/* Load more */}
        {!isLoading && nextPage && shown < totalCount && (
          <div className="load-more-section">
            <button
              id="explore-load-more"
              className="load-more-btn"
              onClick={loadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? 'Loading…' : `Load ${Math.min(12, remaining)} more · ${remaining} remaining`}
            </button>
            <p className="load-more-meta">
              SHOWING {shown} OF {totalCount} TOTAL PROJECTS
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
