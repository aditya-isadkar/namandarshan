export const generateSlug = (name: string, type: 'temple' | 'darshan' | 'puja' | 'chadhava' | 'prasadam'): string => {
    if (!name) return "";

    let slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // Trim hyphens

    const suffix = type === 'darshan' ? '-vipdarshan' : `-${type}`;

    if (!slug.endsWith(suffix)) {
        slug += suffix;
    }

    return slug;
};
