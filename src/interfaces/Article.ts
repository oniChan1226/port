export interface IArticlePost {
    id: number;
    title: string;
    tag_list: string[];
    tags: string;
    url: string;
    created_at: string;
    cover_image: string;
};
export type ArticleList = IArticlePost[];

export interface IArticle extends IArticlePost {
    body_markdown: string;
    reading_time_minutes: number;
    description: string;
};