import {
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title,
    Legend,
} from "chart.js";
import ChartJS from "chart.js/auto";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title,
    Legend,
);

export default ChartJS;
