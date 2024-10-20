import sql from 'better-sqlite3';

const db = new sql('posts.db');

export async function storePost(post) {
    const stmt = db.prepare(`
        INSERT INTO posts (image_url, title, content, user_id)
        VALUES (?, ?, ?, ?)
    `);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return stmt.run(post.imageUrl, post.title, post.content, post.userId);
}

export async function updatePostLikeStatus(postId, userId) {
    const stmt = db.prepare(`
        SELECT COUNT(*) AS count
        FROM likes
        WHERE user_id = ? AND post_id = ?
    `);

    const isLiked = stmt.get(userId, postId).count === 0;

    if (isLiked) {
        const stmt = db.prepare(`
            INSERT INTO likes (user_id, post_id)
            VALUES (?, ?)
        `);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return stmt.run(userId, postId);
    } else {
        const stmt = db.prepare(`
            DELETE FROM likes
            WHERE user_id = ? AND post_id = ?
        `);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return stmt.run(userId, postId);
    }
}