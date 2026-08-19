import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
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
                    Create your account
                </h1>
                <p className='mt-2 text-center text-sm text-ink-soft'>
                    Already writing with us?{' '}
                    <Link to="/login" className="font-medium text-forest hover:underline">
                        Sign in
                    </Link>
                </p>

                {error && (
                    <p className='mt-6 rounded-lg bg-brick/10 px-3 py-2 text-center text-sm text-brick'>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Full name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                            placeholder="Create a password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating account…" : "Create account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
