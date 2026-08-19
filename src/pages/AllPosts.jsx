import { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    return (
        <div className='w-full py-10'>
            <Container>
                <h1 className='spine-heading font-display text-3xl font-semibold text-ink'>
                    All posts
                </h1>
                <p className='mt-2 pl-4 text-sm text-ink-soft'>
                    Every story published on MegaBlog, newest first.
                </p>

                {loading ? (
                    <div className='flex justify-center py-16'>
                        <div className='h-8 w-8 animate-spin rounded-full border-2 border-line border-t-forest' />
                    </div>
                ) : posts.length === 0 ? (
                    <div className='mt-10 rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-soft'>
                        Nothing published yet.
                    </div>
                ) : (
                    <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts
