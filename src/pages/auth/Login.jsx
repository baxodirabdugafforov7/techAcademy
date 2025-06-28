import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import TextInput from "@/components/auth/TextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { isValidEmail, isValidPassword } from "@/utils/validation";
import { useNavigate } from "react-router-dom";
import loginBg from "@/assets/images/login_img.png"

export default function Login() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isValidEmail(form.email)) {
            return setError("Invalid email.");
        }
        if (!isValidPassword(form.password)) {
            return setError("Invalid password format.");
        }

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = storedUsers.find(
            (u) => u.email === form.email && u.password === form.password
        );

        if (!existingUser) {
            return setError("Invalid credentials.");
        }
        localStorage.setItem("currentUser", JSON.stringify(existingUser));
        console.log("Logged in:", existingUser);


        navigate("/dashboard");
    };


    const handleGoogleLogin = () => {
        console.log("Google Login clicked");

    };

    return (
        <AuthLayout
            bgImage={loginBg}
        >

            <AuthFormWrapper title="Log In">
                <form onSubmit={handleSubmit} className="">
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

                    <div className="flex items-center justify-between mb-4 text-sm">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                                className="mr-2 scale-145 accent-green-600"
                            />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="text-black-600 font-bold hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition mb-4"
                    >
                        Log In
                    </button>
                </form>

                <GoogleAuthButton label="Log In with Google" onClick={handleGoogleLogin} />

                <p className="text-sm text-center pt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-black-600 font-bold hover:underline">
                        Sign up
                    </Link>
                </p>
            </AuthFormWrapper>
        </AuthLayout>
    );
}
