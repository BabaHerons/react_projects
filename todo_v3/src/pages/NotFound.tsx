import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-9xl font-bold text-[#a82d14]">404</h1>
                    <h2 className="text-5xl font-bold mt-4">Page Not Found</h2>
                    <p className="py-6">Sorry, we couldn't find the page you are looking for.</p>
                    <Link to="/" className="btn btn-accent">Go Home</Link>
                </div>
            </div> 
        </div>
    )
}