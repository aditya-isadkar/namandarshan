import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                    <Link to="/">Return to Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
