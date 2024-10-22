import { Post } from '@/app/lib/definitions';

export async function getData(): Promise<Post[]> {
    //https://dev.to/feeqcodes/display-json-data-in-nextjs-1hde
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
    const data: Post[] = await res.json();
    return data;
}