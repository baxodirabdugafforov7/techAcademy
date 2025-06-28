import React, { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import TextInput from "@/components/auth/TextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { isValidEmail, isValidPassword } from "@/utils/validation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import signupBg from "@/assets/images/signUp_img.png"

export default function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            return setError("Name is required.");
        }
        if (!isValidEmail(form.email)) {
            return setError("Please enter a valid email.");
        }
        if (!isValidPassword(form.password)) {
            return setError("Password must meet requirements.");
        }

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = storedUsers.find((u) => u.email === form.email);

        if (userExists) {
            return setError("User with this email already exists.");
        }

        const updatedUsers = [...storedUsers, form];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log("User registered:", form);

        localStorage.setItem("currentUser", JSON.stringify(form));

        navigate("/login");
    };


    const handleGoogleAuth = () => {
        console.log("Google Sign Up clicked");
    };

    return (
        <AuthLayout
            bgImage={signupBg}
        >
            <AuthFormWrapper title="Sign Up">
                <form onSubmit={handleSubmit} className="space-y-10" >
                    <TextInput
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                    <TextInput
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                    />
                    <PasswordInput
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition mb-4"
                    >
                        Create Account
                    </button>
                </form>

                <GoogleAuthButton label="Sign Up with Google" onClick={handleGoogleAuth} />

                <p className="text-sm text-center pt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-black-800 font-bold hover:underline">
                        Log in
                    </Link>
                </p>
            </AuthFormWrapper>
        </AuthLayout>
    );
}
