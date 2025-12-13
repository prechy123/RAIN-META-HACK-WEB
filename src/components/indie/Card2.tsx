import { cn } from "@/lib/utils";
const cardContent = {
  title: "Lorem ipsum dolor",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum! Qui dicta debitis aliquid quo molestias explicabo iure!",
};
const CardBody = ({ className = "p-4" }) => (
  <div className={cn("text-start", className)}>
    <h3 className="text-lg font-bold mb-1 text-gray-100">
      {cardContent.title}
    </h3>
    <p className="text-gray-300">
      {cardContent.description}
    </p>
  </div>
);
const Card2 = () => {
  const Line = ({ className = "" }) => (
    <div
      className={cn(
        "h-px w-full via-zinc-400 from-[1%] from-zinc-200 to-zinc-600 absolute -z-0 dark:via-zinc-700 dark:from-zinc-900 dark:to-zinc-500",
        className
      )}
    />
  );
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto w-full px-4 sm:px-6 md:px-8">
      <Line className="bg-gradient-to-l left-0 top-2 sm:top-4 md:top-6" />
      <Line className="bg-gradient-to-r bottom-2 sm:bottom-4 md:bottom-6 left-0" />

      <Line className="w-px bg-gradient-to-t right-2 sm:right-4 md:right-6 h-full inset-y-0" />
      <Line className="w-px bg-gradient-to-t left-2 sm:left-4 md:left-6 h-full inset-y-0" />
      <div className="relative z-20 mx-auto py-8">{children}</div>
    </div>
  );
  return (
    <Container>
      <div className="p-4 w-full center">
        <CardBody />
      </div>
    </Container>
  );
};

export default Card2;
