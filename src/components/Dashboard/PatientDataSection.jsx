import { Button, Typography, Skeleton } from "antd";
import { CSVLink } from "react-csv";
import { handleSearch } from "../../utils/search";
import SearchBar from "../Searchbar/SearchBar";
import PatientTable from "../Table/PatientTable";
import { useState, useEffect } from "react";

const PatientDataSection = ({
    originalData,
    filteredData,
    setFilteredData,
}) => {
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex-[30%] p-1 mt-[4rem]">
            <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                {loading ? (
                    <Skeleton active title={{ width: 150 }} paragraph={false} />
                ) : (
                    <Title level={3} className="mb-2">
                        Information
                    </Title>
                )}

                {loading ? (
                    <Skeleton.Input active title={{ width: 150 }} paragraph={false} />
                ) : (
                    <SearchBar
                        placeholder="Search by name, email, or status"
                        onSearch={(value) =>
                            handleSearch(value, originalData, setFilteredData)
                        }
                    />
                )}
            </div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
                <PatientTable data={filteredData} />
            )}

            <div className="my-4">
                {loading ? (
                    <Skeleton.Button active size="large" shape="default" />
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default PatientDataSection;
