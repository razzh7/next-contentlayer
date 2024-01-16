import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

const mdxComponents = {
  // Add a custom component.
  MyComponent: () => <div>Hello World!</div>
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  // 404 if the post does not exist.
  if (!post) notFound()

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div>
      {/* Some code ... */}
      <MDXContent components={mdxComponents} />
    </div>
  )
}