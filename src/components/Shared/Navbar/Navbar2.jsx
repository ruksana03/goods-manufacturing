import { Link } from "react-router-dom";


const Navbar2 = () => {
    return (
        <div className="flex justify-between">
            <div className="">
                <Link to={'/active-sale'}><button className="btn-style">Active Sale Order</button></Link>
                <Link to={'/complete-sale'}><button className="btn-style mx-4">Complete Sale Order</button></Link>
            </div>
        </div>
    );
};

export default Navbar2;