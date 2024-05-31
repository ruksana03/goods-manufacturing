/* eslint-disable react/prop-types */
import { useState, createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = (email, password) => {
        return new Promise((resolve, reject) => {
            // Static credentials
            const validEmail = 'user123@gmail.com';
            const validPassword = 'user123';

           // Simulate API call
           setTimeout(() => {
            if (email === validEmail && password === validPassword) {
                const name = "User";
                const photo = "https://i.ibb.co/f9by1L2/avatar.jpg";
                setUser({ email, name, photo });
                resolve({ email, name, photo });
            } else {
                reject(new Error('Invalid email or password'));
            }
            }, 1000);
        });
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
