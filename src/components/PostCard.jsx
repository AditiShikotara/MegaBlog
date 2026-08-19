import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"

function formatDate(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function PostCard({ $id, title, featuredImage, $createdAt }) {
  const date = formatDate($createdAt)

  return (
    <Link to={`/post/${$id}`} className='group block h-full'>
      <article className='flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white
          shadow-card transition-transform duration-200 group-hover:-translate-y-1'>
        <div className='aspect-[4/3] w-full overflow-hidden bg-paper-dark'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <div className='flex flex-1 flex-col gap-2 p-4'>
          {date && <span className='eyebrow'>{date}</span>}
          <h2 className='font-display text-lg font-semibold leading-snug text-ink line-clamp-2'>
            {title}
          </h2>
          <span className='mt-auto pt-1 text-sm font-medium text-forest group-hover:underline'>
            Read story →
          </span>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
