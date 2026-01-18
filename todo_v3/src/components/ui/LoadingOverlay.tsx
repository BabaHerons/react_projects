// THIS LOADING MUST BE INSIDE THE RELATIVE PARENT

type LoadingOverlayProps = {
  rounded?: string
  blur?: string
  className?: string
  children?: React.ReactNode
  isSkeleton?: boolean
}

export function LoadingOverlay({
  rounded = "rounded-2xl",
  blur = "backdrop-blur-[2px]",
  className = "",
  isSkeleton = true,
  children
}: LoadingOverlayProps) {
  return (
    <div
      className={`absolute ${isSkeleton ? 'skeleton': ''} inset-0 z-10 flex items-center justify-center
        ${rounded}
        bg-gray-200/20
        ${blur}
        hover:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </div>
  )
}
