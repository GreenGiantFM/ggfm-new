import { Post } from '@components/post'
import { RemainingBlogs } from './remaining-blogs'
import { getBlogs } from './get-blogs'

export const metadata = {
	title: 'Blogs',
	description: 'Blog posts by Green Giant FM'
}

export const revalidate = 0 // remove when revalidatePath is fixed

export default async function BlogPostsPage() {
	const blogs = await getBlogs(1)

	return (
		<div className="max-w-screen-xl w-full px-6 sm:px-16 my-8 justify-self-center">
			<div className="grid grid-cols-[repeat(8,1fr)_repeat(4,minmax(48px,1fr))] md:gap-8 lg:gap-0 w-full">
				<section className="col-start-1 col-span-full lg:col-span-8 xl:col-span-7 row-start-1 space-y-8">
					{
						blogs.map(blog => (
							<Post
								key={blog.id}
								link={`/blogs/${blog.id}`}
								title={blog.title}
								excerpt={blog.body}
								image={process.env.NEXT_PUBLIC_ASSETS_URL + blog.image}
								metadata={
									<div className="flex text-xs font-sans text-gray-600 space-x-4">
										<p>{(new Date(blog.posting_date)).toLocaleDateString()}</p>
									</div>
								}
							/>
						))
					}
					<RemainingBlogs />
				</section>
				<aside className="col-start-9 col-span-3 row-start-1 hidden lg:block">
					<h1 className="sticky top-24 text-white text-6xl text-center">BLOGS</h1>
				</aside>
			</div>
		</div>
	)
}
