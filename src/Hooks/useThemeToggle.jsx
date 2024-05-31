import { useEffect, useState } from "react";

const useThemeToggle = () => {
    const [mode, setMode] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme || "day";
    });

    useEffect(() => {
        localStorage.setItem("theme", mode);
        const body = document.body;
        body.classList.remove('day', 'night');
        body.classList.add(mode);
    }, [mode]);

    const toggleTheme = (theme) => {
        if (theme) {
            setMode(theme);
        } else {
            setMode((prevMode) => (prevMode === "day" ? "night" : "day"));
        }
    };

    return { mode, toggleTheme };
};

export default useThemeToggle;
