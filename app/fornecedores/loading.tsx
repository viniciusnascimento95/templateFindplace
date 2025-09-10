export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-brand-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Search Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1 animate-pulse"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full animate-pulse"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-14"></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
