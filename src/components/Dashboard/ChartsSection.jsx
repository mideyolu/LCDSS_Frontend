import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";

const ChartsSection = () => (
    <div className="mt-3 md:mt-0 flex items-center justify-between gap-10 flex-col lg:flex-row min-h-[50vh]">
        <div className="left">
            <PieChart />
        </div>
        <div>
            <BarChart />
        </div>
    </div>
);

export default ChartsSection;
