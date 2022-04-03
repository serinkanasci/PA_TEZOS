import { Link } from "react-router-dom";
import "../styles/notfound.css";

const NotFound = () => {
    return (
        <section className="notfound">
            <Link to="/" target="_blank" class="text-3d">404</Link>
            <span class="caption">Click to Return Home</span>
        </section>
    );
}

export default NotFound;