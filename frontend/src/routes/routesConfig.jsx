import Dashboard from "./Dashboard";
import Detection from "./Detection";
import FAQ from "./FAQ";
import HomePage from "./HomePage";
import Login from "./Login";
import Onboarding from "./Onboarding";
import Signup from "./Signup";

export const routesConfig = [
    { path: "/", element: <HomePage /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/onboarding", element: <Onboarding /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/detect", element: <Detection /> },
];
