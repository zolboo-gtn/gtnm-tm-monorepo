"use client";

import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useToast,
} from "ui";
import { cn } from "utils";

export const LogoutDialog: React.FC<
  React.Translations<"common" | "logout">
> = ({ translations }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="aspect-square">
        <Button
          variant="ghost"
          className={cn(
            "h-full text-white",
            "hover:bg-black/20 hover:text-white",
            "active:bg-black/30"
          )}
        >
          <LogOutIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent aria-disabled>
        <DialogHeader>
          <DialogTitle>{translations.logout.title}</DialogTitle>
          <DialogDescription>
            {translations.logout.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
            {translations.common.cancel}
          </Button>
          <Button
            disabled={isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);
                await fetch("/api/session", {
                  method: "DELETE",
                });
                // TODO: invalidate cache
                router.push("/login");
              } catch (error) {
              } finally {
                setIsLoading(false);
                setIsOpen(false);
                toast({
                  title: "Scheduled: Catch up",
                  description: "Friday, February 10, 2023 at 5:57 PM",
                });
              }
            }}
          >
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            {translations.common.logout}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
