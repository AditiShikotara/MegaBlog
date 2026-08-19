import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import authService from "../appwrite/auth"
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex w-full items-center justify-center px-4'>
            <div className='w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10'>
                <div className='mb-6 flex justify-center'>
                    <Logo width='72px' />
                </div>
                <h1 className='text-center font-display text-2xl font-semibold text-ink'>
                    Welcome back
                </h1>
                <p className='mt-2 text-center text-sm text-ink-soft'>
                    New to MegaBlog?{' '}
                    <Link to="/signup" className="font-medium text-forest hover:underline">
                        Create an account
                    </Link>
                </p>

                {error && (
                    <p className='mt-6 rounded-lg bg-brick/10 px-3 py-2 text-center text-sm text-brick'>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="you@example.com"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in…" : "Sign in"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
