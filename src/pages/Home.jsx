import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    return (
        <div className='w-full'>
            <div className='border-b border-line bg-paper-dark/40'>
                <Container className='py-14 sm:py-20'>
                    <span className='eyebrow'>The journal</span>
                    <h1 className='mt-3 max-w-2xl font-display text-4xl font-semibold italic leading-tight text-ink sm:text-5xl'>
                        Stories worth the ink.
                    </h1>
                    <p className='mt-4 max-w-xl text-base text-ink-soft sm:text-lg'>
                        Read what people are writing this week, or start a page of your own.
                    </p>
                    {!authStatus && (
                        <div className='mt-7 flex flex-wrap gap-3'>
                            <Link to='/signup' className='rounded-lg bg-forest px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-forest-dark'>
                                Start writing
                            </Link>
                            <Link to='/login' className='rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper-dark'>
                                Sign in
                            </Link>
                        </div>
                    )}
                </Container>
            </div>

            <Container className='py-12'>
                {loading ? (
                    <div className='flex justify-center py-16'>
                        <div className='h-8 w-8 animate-spin rounded-full border-2 border-line border-t-forest' />
                    </div>
                ) : posts.length === 0 ? (
                    <div className='rounded-2xl border border-dashed border-line py-16 text-center'>
                        <h2 className='spine-heading mx-auto inline-block font-display text-xl font-semibold text-ink'>
                            No stories yet
                        </h2>
                        <p className='mx-auto mt-3 max-w-sm text-sm text-ink-soft'>
                            {authStatus
                                ? "Be the first to publish one — it only takes a few minutes."
                                : "Sign in to read what's been published so far."}
                        </p>
                        <Link
                            to={authStatus ? '/add-post' : '/login'}
                            className='mt-6 inline-block rounded-lg bg-forest px-5 py-2.5 text-sm font-medium text-paper hover:bg-forest-dark'
                        >
                            {authStatus ? 'Write a story' : 'Sign in'}
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home
