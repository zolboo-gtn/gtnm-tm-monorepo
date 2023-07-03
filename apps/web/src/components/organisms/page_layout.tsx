import { cn } from "utils";

type Props = {
  type?: "container" | "max-400" | "max-800";
};
export const PageLayout: React.FCC<Props> = ({
  children,
  type = "container",
}) => {
  return (
    <main
      className={cn(
        "container mx-auto pb-10 pt-5",
        type === "max-400" && "max-w-[400px]",
        type === "max-800" && "max-w-[800px]"
      )}
    >
      {children}
    </main>
  );
};
