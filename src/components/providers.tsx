"use client";

import { AuthLoadingView } from "@/features/auth/components/auth-loading-view";
import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Authenticated>{children}</Authenticated>
            <Unauthenticated>
              <UnauthenticatedView />
            </Unauthenticated>
            <AuthLoading>
              <AuthLoadingView />
            </AuthLoading>
          </ThemeProvider>
        </TooltipProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
