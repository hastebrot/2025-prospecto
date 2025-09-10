import { useEffect } from "react";
import { useNavigate, type RouteObject } from "react-router";
import { UiColorsPage } from "./ui/ui-colors-page";
import { UiLayoutPage } from "./ui/ui-layout-page";
import { UiSalesOrdersPage } from "./ui/ui-sales-orders";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: () => {
      const navigate = useNavigate();
      useEffect(() => {
        navigate("/ui/sales-orders", { replace: true });
      }, []);
      return null;
    },
  },
  {
    path: "/ui",
    children: [
      // wrap.
      { path: "colors", Component: () => <UiColorsPage /> },
      { path: "layout", Component: () => <UiLayoutPage /> },
      { path: "sales-orders", Component: () => <UiSalesOrdersPage /> },
    ],
  },
];
