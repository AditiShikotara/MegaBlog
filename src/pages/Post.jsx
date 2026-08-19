import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";

function formatDate(iso) {
    if (!iso) return null
    return new Date(iso).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className='flex min-h-[50vh] w-full items-center justify-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-2 border-line border-t-forest' />
            </div>
        )
    }

    if (!post) return null;

    return (
        <div className="py-10">
            <Container className="max-w-3xl">
                {isAuthor && (
                    <div className="mb-4 flex justify-end gap-3">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-forest">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-brick" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}

                <span className="eyebrow">{formatDate(post.$createdAt)}</span>
                <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                    {post.title}
                </h1>

                <div className="mt-6 w-full overflow-hidden rounded-2xl border border-line">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full object-cover"
                    />
                </div>

                <div className="article-content mt-10">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    );
}
