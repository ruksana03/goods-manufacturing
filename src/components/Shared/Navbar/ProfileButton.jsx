import { useState } from "react";
import { BiCaretDown, BiCaretRight } from "react-icons/bi";
import useAuth from "../../../Hooks/useAuth";



const ProfileButton = () => {
    const { user, signOut } = useAuth();
    console.log(user);

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    return (
        <div className="relative text-black">
        
           
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 focus:outline-none text-white"
            >
                {isDropdownOpen ? <BiCaretRight /> : <BiCaretDown />}
                <img className="w-10 rounded-full" src={user?.photo} alt={user?.name} />

                {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 right-50 top-10 w-48 bg-white text-black  rounded-lg shadow-lg">
                        <ul className="py-2">
                            <li className="btn-style">{user?.name}</li>
                            <li>
                                <button className="btn-style border border-white w-full" onClick={signOut}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </button>

        </div>

    );
};

export default ProfileButton;