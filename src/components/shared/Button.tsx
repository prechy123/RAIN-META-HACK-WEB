import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

//======================================Shine
export const Button_v2 = ({
  children,
  ...rest
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      {...rest}
      className={cn(
        "group relative overflow-hidden ease-in-out ",
        // light mode
        "text-zinc-50 bg-gradient-to-tr from-zinc-900 to-zinc-700 hover:shadow-zinc-500/30",
        // dark mode
        "text-zinc-900 bg-gradient-to-tr from-zinc-50 to-zinc-100 hover:shadow-zinc-700/30",
        rest.className
      )}
    >
      <span>{children}</span>
      <span className="absolute inset-0 flex size-full justify-center [transform:skew(-14deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-14deg)_translateX(100%)]">
        <span className="relative h-full w-8  bg-black/10" />
      </span>
    </Button>
  );
};
