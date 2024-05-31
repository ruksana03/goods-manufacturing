/* eslint-disable no-unused-vars */
// import { useContext } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { getAuth, updateProfile } from "firebase/auth"; // Import necessary functions from Firebase

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.elements.name.value;
        const email = event.target.elements.email.value;
        const img = 'https://i.ibb.co/f9by1L2/avatar.jpg';
        const password = event.target.elements.password.value;

        try {
            // Create user using your auth method
            const userCredential = await createUser(email, password);
            const user = userCredential.user;

            // Update user profile with display name and photo URL
            await updateProfile(user, {
                displayName: name,
                photoURL: img,
            });

            // Send data to your server
            const userInfo = { name, email, img, password };
            const response = await axios.post("http://localhost:5000/users", userInfo);

            if (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your account has been created successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong with the server!',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    return (
        <div className="flex flex-col items-center font-serif gap-4 bg-transparent text-white my-12 w-full lg:justify-center">
            <div className="w-1/2">
                <div className="text-center text-xl pt-12">
                    <h1 className="text-4xl my-2">Only Me</h1>
                    <p>Creating My Account</p>
                </div>
                <div className="my-6 mx-8">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <input type="text" placeholder="Full name" className="bg-white text-black pl-4 py-3 text-sm" name="name" />
                        <input type="email" placeholder="Email" className="bg-white text-black pl-4 py-3 my-2 text-sm" name="email" />
                        <input type="password" placeholder="Password" className="bg-white text-black pl-4 py-3 mb-2 text-sm" name="password" />
                        <button className="py-3 bg-[#FFA637] rounded-sm text-sm text-white font-semibold" type="submit">Register</button>
                        <div className="flex justify-between my-6 text-sm">
                            <span>Have an account?</span>
                            <Link to="/login" className="label-text-alt link link-hover">Please Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
