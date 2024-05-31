import { useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import useThemeToggle from "../../Hooks/useThemeToggle";

const Theme = () => {
    const { mode, toggleTheme } = useThemeToggle();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleThemeChange = (theme) => {
        toggleTheme(theme);
        setDropdownOpen(false);
    };

    return (
        <div className="relative flex items-center justify-center">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center"
                aria-expanded={dropdownOpen}
                aria-controls="theme-dropdown"
                aria-label="Toggle theme dropdown"
            >
                {mode === "night" ? (
                    <BsFillMoonStarsFill className="text-xl normalText" aria-label="Night mode" />
                ) : (
                    <MdOutlineWbSunny className="text-xl normalText" aria-label="Day mode" />
                )}
            </button>
            {dropdownOpen && (
                <div
                    id="theme-dropdown"
                    className={`absolute top-10 right-0 bg-white shadow-lg rounded-md z-10 border ${mode === "night" ? "bg-black":""}`}
                >
                    <button
                        onClick={() => handleThemeChange("day")}
                        className="flex justify-center items-center w-full py-2 px-4 hover:bg-gray-100"
                        aria-label="Switch to day mode"
                    >
                        <MdOutlineWbSunny className="text-2xl normalText" />
                        <span className="ml-2">Day</span>
                    </button>
                    <button
                        onClick={() => handleThemeChange("night")}
                        className="flex justify-center items-center w-full py-2 px-4 hover:bg-gray-100"
                        aria-label="Switch to night mode"
                    >
                        <BsFillMoonStarsFill className="text-2xl normalText" />
                        <span className="ml-2">Night</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Theme;
