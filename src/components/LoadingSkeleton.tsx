"use client";

export function LoadingSkeleton() {
  return (
    <div className="flex w-screen h-[85vh] xl:h-[95vh] p-5">
      <div className="w-full h-full">
        <div className="flex gap-4 h-full">
          {/* Left Skeleton */}
          <div className="w-1/2 bg-transparent rounded-md shadow-sm p-4 flex items-center justify-center">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-[#555] rounded-full animate-ping opacity-75"></div>
                  <div className="absolute top-0 w-20 h-20 border-4 border-x-[#444] border-y-white rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="absolute bottom-1/4 left-0 right-0 text-center">
                <p className="text-gray-400 text-sm tracking-wider animate-pulse">
                  Let Me Think...
                </p>
              </div>
            </div>
          </div>

          {/* Right Skeleton */}
          <div className="w-1/2 bg-[#444] rounded-lg shadow-sm p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
              <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-200 rounded-md w-full"></div>
                ))}
                <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
