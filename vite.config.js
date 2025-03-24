// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     base: "/",
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/",
    server: {
        watch: {
            usePolling: true, // Ensures file changes are detected
        },
        hmr: true, // Ensures Hot Module Replacement (HMR) is enabled
    },
});
