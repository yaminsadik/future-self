export default function PageLayout ({ children }) {
  return (
    <main className="min-h-screen bg-bg text-textPrimary">
        <div className= "mx-auto w-full max-w-[393px] sm:max-w-[420px] md:max-w-[480px] px-4 py-6">
            {children}
        </div>
    </main>
  )
}