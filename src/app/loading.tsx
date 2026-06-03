export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className="h-11 w-11 animate-spin rounded-full border-2 border-muted border-t-primary"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-muted-foreground">
          Loading...
        </p>
      </div>
    </main>
  );
}
