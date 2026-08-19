import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { Container, PostForm } from '../components';

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-10'>
            <Container>
                <h1 className='spine-heading mb-8 font-display text-3xl font-semibold text-ink'>
                    Edit story
                </h1>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div className='flex min-h-[50vh] w-full items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-line border-t-forest' />
        </div>
    )
}

export default EditPost
