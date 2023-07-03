"use client";

import { Loader2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "ui";

import { useClientTransition } from "@/hooks/use_client_transition";

export const ClientTransitionLoader: React.FC<
  React.Translations<"clientLoader">
> = ({ translations }) => {
  const isTransitioning = useClientTransition((state) => state.isTransitioning);

  if (!isTransitioning) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4">
      <Alert>
        <Loader2Icon className="h-4 w-4 animate-spin" />
        <AlertTitle>{translations.clientLoader.title}</AlertTitle>
        <AlertDescription>
          {translations.clientLoader.description}
        </AlertDescription>
      </Alert>
    </div>
  );
};
