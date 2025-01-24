import HomePage from "./HomePage";
import FAQ from "./FAQ";
import Onboarding from "./Onboarding";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Detection from "./Detection";
import Chart from "./Chart";

export const routesConfig = [
    { path: "/", element: <HomePage /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/onboarding", element: <Onboarding /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/detect", element: <Detection /> },
    { path: "/chart-dashboard", element: <Chart /> },
];
