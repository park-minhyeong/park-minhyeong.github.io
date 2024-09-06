import { useState, useEffect, ComponentType } from "react";

type PageComponent = ComponentType<any>;
type RouteItem = {
  path: string;
  component: PageComponent;
  layout: PageComponent | null;
};
const LAYOUTS = import.meta.glob("/src/app/**/layout.tsx") as Record<
  string,
  () => Promise<{ default: PageComponent }>
>;
const COMPONENTS = import.meta.glob("/src/app/**/[a-z[]*.tsx") as Record<
  string,
  () => Promise<{ default: PageComponent }>
>;

export default function useRoute() {
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  useEffect(() => {
    const loadRoutes = async () => {
      const routeItems: RouteItem[] = await Promise.all(
        Object.keys(COMPONENTS).map(async (key) => {
          const path = key
            .replace(/\/src\/app|page|\.tsx$/g, "")
            .replace(/\[\.{3}.+\]/, "*")
            .replace(/\[(.+)\]/, ":$1");

          const Component = (await COMPONENTS[key]()).default;
          const layoutPath = Object.keys(LAYOUTS).find((layoutKey) =>
            key.startsWith(layoutKey.replace(/layout.tsx$/, ""))
          );
          const Layout = layoutPath
            ? (await LAYOUTS[layoutPath]()).default
            : null;

          return { path, component: Component, layout: Layout };
        })
      );

      setRoutes(routeItems);
    };
    loadRoutes();
  }, []);

  return routes;
}
