import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComponentType, Fragment } from "react";
import useRoute from "@/hook/useRoute";

export default function App() {
  const routes = useRoute();
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {routes.map(({ path, component, layout }) => {
          return (
            <Route
              key={path}
              path={path}
              element={RenderComponent(component, layout)}
            />
          );
        })}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center w-full min-h-screen">
              LOADING
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function RenderComponent(
  Component: ComponentType<any>,
  Layout: ComponentType<any> | null
) {
  if (Layout) return <Layout children={<Component />} />;
  return <Fragment children={<Component />} />;
}
