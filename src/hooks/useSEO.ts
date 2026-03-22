import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export const useSEO = ({ title, description, image, url }: SEOProps) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | WMK Connect` : 'WMK Connect - Deine Region, Deine Jobs';
        document.title = fullTitle;

        const updateMeta = (name: string, content?: string, property = false) => {
            if (!content) return;
            const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let el = document.querySelector(selector);
            if (!el) {
                el = document.createElement('meta');
                if (property) el.setAttribute('property', name);
                else el.setAttribute('name', name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        updateMeta('description', description);
        updateMeta('og:title', fullTitle, true);
        updateMeta('og:description', description, true);
        updateMeta('og:image', image, true);
        updateMeta('og:url', url || window.location.href, true);
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', fullTitle);
        updateMeta('twitter:description', description);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', image);

        // Canonical Tag - Robust Injection
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        const canonicalUrl = url || window.location.origin + window.location.pathname;
        canonicalLink.href = canonicalUrl;

    }, [title, description, image, url]);
};
