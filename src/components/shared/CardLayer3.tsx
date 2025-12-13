// import { cn } from "@/lib/utils";
 
// const cardContent = {
// title: "Lorem ipsum dolor",
// description:
// "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum! Qui dicta debitis aliquid quo molestias explicabo iure!",
// };
// const CardBody = ({ className = "" }) => (
 
//   <div className={cn(className)}>
//     <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
//       {cardContent.title}
//     </h3>
//     <p className="text-gray-700 dark:text-gray-400">
//       {cardContent.description}
//     </p>
//   </div>
// )
type CardProps = {
  children?: React.ReactNode
}
//======================================
 const MultilayerCardV_3 = ({children}: CardProps) => {
  return (
    <div className="">
      <div className="relative mx-auto min-h-72 sm:min-h-64">
        <div
          className="animate-pulse bg-blue-600 absolute size-full rounded-3xl border border-zinc-800 scale-y-[.75] scale-x-[1.01]"
          style={{
            transformOrigin: "center center",
            top: "50%",
            transform: "translateY(-50%) scaleY(0.75) scaleX(1.01)"
          }}
        ></div>
        <div
          className="absolute bg-zinc-950 w-full rounded-3xl p-2 md:p-4 border border-neutral-200 center shadow-[0px_0px_64px_rgba(39,39,42,0.6)] scale-95"
          style={{
            transformOrigin: "top center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default MultilayerCardV_3;