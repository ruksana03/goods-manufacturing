/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = "User"
        const photo = "https://i.ibb.co/f9by1L2/avatar.jpg"
        const email = event.target.email.value;
        const password = event.target.password.value;

        signIn(email, password)
            .then(res => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Logged in successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Navigate to home page after successful login
                navigate('/');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong with the login!',
                });
            });
    }

    return (
        <div className="flex flex-col items-center font-serif gap-4 bg-transparent text-white my-12 w-full lg:justify-center">
            <div className="w-1/2">
                <div className="text-center text-xl pt-12">
                    <h1 className="text-4xl my-2">Login</h1>
                    <p>Access your account</p>
                </div>
                <div className="my-6 mx-8">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <input type="email" placeholder="Email" className="bg-white text-black pl-4 py-3 my-2 text-sm" name="email" />
                        <input type="password" placeholder="Password" className="bg-white text-black pl-4 py-3 mb-2 text-sm" name="password" />
                        <button className="py-3 bg-[#FFA637] rounded-sm text-sm text-white font-semibold" type="submit">Login</button>
                        <div className="flex justify-between my-6 text-sm">
                            {/* <span>Don't have an account?</span> */}
                            {/* <Link to="/register" className="label-text-alt link link-hover">Register</Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
