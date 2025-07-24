// YouTube Metadata Fetcher
// This script fetches video details from YouTube and updates the page dynamically

async function fetchYouTubeMetadata(videoUrl) {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return null;
    
    // Using YouTube oEmbed API (no API key required)
    try {
        const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`);
        if (!response.ok) return null;
        
        const data = await response.json();
        return {
            title: data.title,
            author: data.author_name,
            authorUrl: data.author_url,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        };
    } catch (error) {
        console.error('Error fetching YouTube metadata:', error);
        return null;
    }
}

function extractVideoId(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Auto-populate metadata on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Check if we're on an attribution page with a video
    const videoContainer = document.querySelector('.video-container');
    const videoUrlMeta = document.querySelector('meta[property="og:video"]');
    
    if (videoContainer && videoUrlMeta) {
        const videoUrl = videoUrlMeta.content;
        const metadata = await fetchYouTubeMetadata(videoUrl);
        
        if (metadata) {
            // Update page title if it's generic
            const titleElement = document.querySelector('.attribution-header h1');
            if (titleElement && titleElement.textContent.includes('Video Compilation')) {
                titleElement.textContent = metadata.title;
            }
            
            // Add YouTube channel info if not present
            const contentElement = document.querySelector('.attribution-content');
            if (contentElement && !contentElement.textContent.includes('YouTube Channel:')) {
                const channelInfo = document.createElement('p');
                channelInfo.innerHTML = `<strong>YouTube Channel:</strong> <a href="${metadata.authorUrl}" target="_blank" rel="noopener">${metadata.author}</a>`;
                channelInfo.style.marginBottom = '1rem';
                
                // Insert after the title
                const firstH1 = contentElement.querySelector('h1');
                if (firstH1 && firstH1.nextSibling) {
                    firstH1.parentNode.insertBefore(channelInfo, firstH1.nextSibling);
                }
            }
            
            // Update document title
            if (document.title.includes('Video Compilation')) {
                document.title = document.title.replace('Video Compilation', metadata.title);
            }
        }
    }
    
    // For the main attribution grid, enhance cards with YouTube data
    const attributionCards = document.querySelectorAll('.attribution-card');
    for (const card of attributionCards) {
        const link = card.getAttribute('href');
        if (link && link.includes('/attribution/')) {
            // This would require server-side processing or a different approach
            // as we can't easily get the video URL from just the card
        }
    }
});

// Helper function to create attribution file template
function generateAttributionTemplate(videoUrl) {
    const videoId = extractVideoId(videoUrl);
    const date = new Date().toISOString().split('T')[0];
    
    return `---
layout: attribution
title: "Video Compilation"
description: "Attribution information for video compilation"
video_url: "${videoUrl}"
date: ${date}
---

# Video Attribution

This page will be automatically enhanced with YouTube metadata when loaded.

## Attribution Details

[Add your attribution content here]`;
}