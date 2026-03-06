import { STORY_DATA } from '@/lib/data/stories';
import { notFound } from 'next/navigation';
import { StoryArticleRenderer } from '@/components/features/story-article-renderer';

// Next.js metadata generation for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
    const story = STORY_DATA.find(s => s.id === params.id);
    if (!story) return { title: 'Story Not Found | The Ethereal Journey' };

    return {
        title: `${story.title} | The Ethereal Journey`,
        description: story.excerpt,
    };
}

// Statically generate these paths
export function generateStaticParams() {
    return STORY_DATA.map((story) => ({
        id: story.id,
    }));
}

export default function StoryPage({ params }: { params: { id: string } }) {
    const story = STORY_DATA.find(s => s.id === params.id);

    if (!story) {
        notFound();
    }

    // We abstract the heavy framer-motion logic into a client component
    // to keep this page a fast Server Component
    return <StoryArticleRenderer story={story} />;
}
