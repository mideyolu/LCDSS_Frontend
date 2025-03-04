import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Result
            className="flex items-center justify-center min-h-[85vh] flex-col gap-5"
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link to="/">
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    );
};

export default NotFound;
