'use server';

import { redirect } from 'next/navigation';

import { storePost } from '@/lib/data';

export async function createPost(_prevState, formData) {

    // Field names defined by `name` vlaues from `input` fields.
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');
    let errors = [];

    if (!title || title.trim().length === 0) {
        errors.push("Title required");
    }

    if (!image || image.size === 0) {
        errors.push("Image required");
    }

    if (!content || content.trim().length === 0) {
        errors.push("Content required");
    }    

    if (errors.length > 0) {
        return { errors };
    }

    await storePost({ imageUrl: '', title, content, userId: 1 });

    redirect('/feed');
}