import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-[#f7f3ed] px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
          Project Details
        </p>

        <h1 className="mt-3 text-4xl font-bold text-black">
          Project #{id}
        </h1>

        <p className="mt-4 text-gray-600">
          This page is under construction. The full project details will be added soon.
        </p>
      </div>
    </main>
  );
}