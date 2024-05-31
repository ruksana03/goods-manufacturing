import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";
// import Skills from "../../Skills";
import Theme from "../Theme";

const Navbar = () => {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <div
            className={`py-2 h-12 text-sm fixed w-full px-12 z-50 flex justify-between items-center   font-serif ${isScrolled ? "" : "bg-transparent"
                }`}
            style={{ backdropFilter: isScrolled ? "blur(5px)" : "none" }}
        >
            <div className="normalText">
                {
                    user?.email ? <div>
                        <ProfileButton></ProfileButton>
                    </div>
                        :
                        <div>
                            <Link to="/login"  className="normalText">Login</Link>
                        </div>
                }
            </div>
            <Link to={'/'}  className="normalText">Home</Link>
            <div>
                <Theme />
            </div>

        </div>
    );
};

export default Navbar;
