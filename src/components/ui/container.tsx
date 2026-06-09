import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean; // small container
}

export default function Container({
  children,
  className,
  narrow,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5",
        narrow ? "max-w-3xl" : "max-w-330",
        className,
      )}
    >
      {children}
    </div>
  );
}
