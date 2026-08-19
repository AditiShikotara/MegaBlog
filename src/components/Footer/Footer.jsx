import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from '../index'
import Logo from '../Logo'

function Footer() {
  const authStatus = useSelector((state) => state.auth.status)
  const year = new Date().getFullYear()

  return (
    <footer className='mt-16 border-t border-line bg-paper-dark/60'>
      <Container className='py-10'>
        <div className='flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center'>
          <div>
            <Logo width='72px' />
            <p className='mt-2 max-w-xs text-sm text-ink-soft'>
              A quiet place to write things down and read what others wrote.
            </p>
          </div>

          <nav className='flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink-soft'>
            <Link to='/' className='hover:text-ink'>Home</Link>
            <Link to='/all-posts' className='hover:text-ink'>All posts</Link>
            {authStatus ? (
              <Link to='/add-post' className='hover:text-ink'>Write</Link>
            ) : (
              <Link to='/signup' className='hover:text-ink'>Sign up</Link>
            )}
          </nav>
        </div>

        <div className='mt-8 flex flex-col-reverse items-start gap-2 border-t border-line pt-6 text-xs
            text-ink-soft/80 sm:flex-row sm:items-center sm:justify-between'>
          <p className='font-mono'>© {year} MegaBlog. All rights reserved.</p>
          <p className='eyebrow'>Est. 2023</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
