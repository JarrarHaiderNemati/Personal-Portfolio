import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Bone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 fossil-grain">
      <Bone
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-96 w-96 rotate-[-25deg] text-amber/[0.08]"
        strokeWidth={0.6}
      />
      <div className="relative w-full min-w-0 max-w-xl overflow-hidden rounded-3xl border border-amber/35 bg-card/90 p-6 text-center shadow-2xl backdrop-blur sm:p-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-amber">
          Excavation Error · 404
        </div>
        <h1 className="mt-5 font-display text-5xl leading-[0.92] text-foreground sm:text-8xl">
          <span className="block">Fossil Not</span>
          <span className="block">Found</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
          The page you're looking for went extinct millions of years ago.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-amber px-6 py-3 text-sm font-semibold text-amber-foreground transition-transform hover:scale-[1.03]"
          >
            Return to Base Camp →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Jarrar Haider Nemati — Agentic AI & Full Stack Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Jarrar Haider Nemati — MERN, LangGraph agents, ML/DL, and n8n automations. An expedition through production-ready AI systems.",
      },
      { name: "author", content: "Jarrar Haider Nemati" },
      { property: "og:title", content: "Jarrar Haider Nemati — Agentic AI & Full Stack Engineer" },
      {
        property: "og:description",
        content:
          "An expedition through production-ready MERN apps, LangGraph agents, ML/DL experiments, and n8n automations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
