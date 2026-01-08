export default function PageLayout({ children }) {
  return (
    <main className="min-h-screen bg-bg text-textPrimary">
      <div className="mx-auto w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] px-5 py-6">
        {children}
      </div>
    </main>
  );
}