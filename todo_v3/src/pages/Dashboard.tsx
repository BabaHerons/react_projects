import { Link } from "react-router-dom";

export default function Dashboard() {
  
  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <h1 className="text-4xl mt-4">Dashboard Page</h1>
      <div className="flex gap-2">
        <Link to="/login"><button className="btn btn-accent">Login</button></Link>
        <Link to="/todos"><button className="btn btn-accent">Todo</button></Link>
      </div>
    </div>
  );
}
