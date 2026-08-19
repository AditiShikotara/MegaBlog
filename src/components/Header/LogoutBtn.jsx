import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
        className='inline-block rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-medium
            text-ink-soft transition-colors duration-200 hover:border-brick/40 hover:bg-brick/5 hover:text-brick sm:px-4'
        onClick={logoutHandler}
    >
        Log out
    </button>
  )
}

export default LogoutBtn
