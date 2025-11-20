export async function getContent(key, defaultValue = '') {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/content/${key}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) return defaultValue;

        const data = await response.json();
        return data.value || defaultValue;
    } catch (error) {
        console.error(`Error fetching content for ${key}:`, error);
        return defaultValue;
    }
}

export async function getContentBySection(section) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/content?section=${section}`, {
            next: { revalidate: 60 }
        });

        if (!response.ok) return [];

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching content for section ${section}:`, error);
        return [];
    }
}

export async function getAllContent() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/content/sections`, {
            next: { revalidate: 60 }
        });

        if (!response.ok) return {};

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all content:', error);
        return {};
    }
}
