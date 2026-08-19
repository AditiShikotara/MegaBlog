import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Write', slug: '/add-post', active: authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Sign up', slug: '/signup', active: !authStatus },
  ]

  return (
    <header className='sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur'>
      <Container>
        <nav className='flex h-16 items-center justify-between'>
          <Link to='/' className='shrink-0'>
            <Logo width='72px' />
          </Link>

          <ul className='flex items-center gap-1'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 sm:px-4 ${
                        isActive
                          ? 'bg-ink text-paper'
                          : 'text-ink-soft hover:bg-paper-dark hover:text-ink'
                      }`
                    }
                    end={item.slug === '/'}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='ml-1'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
