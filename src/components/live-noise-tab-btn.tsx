import { Button as SnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Button({ monitoring }: { monitoring: boolean }) {
  return (
    <SnButton
      type="submit"
      className={cn(`w-full`, {
        monitoring: "bg-neutral-300 hover:bg-slate-400",
      })}
    >
      {monitoring ? "End monitoring" : "Start monitoring"}
    </SnButton>
  );
}
