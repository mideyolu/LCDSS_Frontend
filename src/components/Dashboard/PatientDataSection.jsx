import { Button, Typography } from "antd";
import { CSVLink } from "react-csv";
import { handleSearch } from "../../utils/search";
import SearchBar from "../Searchbar/SearchBar";
import PatientTable from "../Table/PatientTable";

const PatientDataSection = ({
    originalData,
    filteredData,
    setFilteredData,
}) => {
    const csvHeaders = [
        { label: "S/N", key: "sn" },
        { label: "Name", key: "name" },
        { label: "Age", key: "age" },
        { label: "Gender", key: "gender" },
        { label: "Email", key: "email" },
        { label: "Notes", key: "notes" },
        { label: "Status", key: "status" },
    ];
    const { Title } = Typography;

    return (
        <div className="flex-[30%] p-1 mt-[4rem]">
            <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                <Title
                    level={3}
                    className="mb-2"
                  
                >
                    Information
                </Title>
                <SearchBar
                    placeholder="Search by name, email, or status"
                    onSearch={(value) =>
                        handleSearch(value, originalData, setFilteredData)
                    }
                />
            </div>
            <PatientTable data={filteredData} />

            <div className="my-4">
                <Button type="primary">
                    <CSVLink
                        data={filteredData}
                        headers={csvHeaders}
                        filename="patient_data.csv"
                        style={{ color: "white" }}
                    >
                        Export Data
                    </CSVLink>
                </Button>
            </div>
        </div>
    );
};

export default PatientDataSection;
