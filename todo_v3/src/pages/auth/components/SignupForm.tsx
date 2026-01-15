interface SignupFormProps{
    onSwitchToLogin: () => void
}

export default function SignupForm({onSwitchToLogin}:SignupFormProps){
    return (
        <>
        {/* Create Account */}
        <div className="mt-4 text-center">
            <p className="text-slate-500 text-sm">
            Already have an account?&nbsp;&nbsp;
            <button
                onClick={onSwitchToLogin}
                type="button"
                className="text-black font-semibold hover:underline hover:cursor-pointer"
            >
                Log In
            </button>
            </p>
        </div>
        </>
    )
}