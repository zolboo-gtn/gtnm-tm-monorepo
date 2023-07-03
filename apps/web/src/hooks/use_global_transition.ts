import { useContext } from "react";

import { GlobalTransitionContext } from "@/components/organisms/global_transition";

export const useGlobalTransition = () => {
  const { isPending, startTransition } = useContext(GlobalTransitionContext);

  return { isPending, startTransition };
};
