# Attribution Links

A simple, beautiful website for managing content attribution with automatic YouTube metadata extraction.

## Quick Start

### Super Simple Method (Recommended)

Just create a markdown file with only the video URL:

```yaml
---
layout: attribution-auto
video_url: "https://www.youtube.com/watch?v=VIDEO_ID"
---
```

That's it! The site will automatically:
- Extract the video title from YouTube
- Get the channel name
- Generate the thumbnail
- Create all SEO metadata
- Display the video

### Example

Create a file `attribution/VIDEO_ID.md`:

```yaml
---
layout: attribution-auto
video_url: "https://www.youtube.com/watch?v=7CIOG8yZiY0"
---
```

### Adding Attribution Details (Optional)

If you want to add clip details, just write them below the front matter:

```yaml
---
layout: attribution-auto
video_url: "https://www.youtube.com/watch?v=7CIOG8yZiY0"
---

## Clips Used

### Clip 1
**URL:** https://www.tiktok.com/@user/video/123  
**Creator:** Username  
**Title:** Clip Title  

### Clip 2
**URL:** https://www.tiktok.com/@user/video/456  
**Creator:** Username  
**Title:** Clip Title  
```

## Features

- ✨ Automatic YouTube metadata extraction
- 🎨 Beautiful dark theme with glassmorphism
- 🚀 Excellent SEO with JSON-LD structured data
- 📱 Fully responsive design
- 🔍 Automatic sitemap generation
- ⚡ Fast static site (GitHub Pages)

## File Structure

```
/attribution/          # Put your attribution .md files here
/assets/css/          # Styling
/assets/js/           # JavaScript for YouTube integration
/_layouts/            # Page templates
/index.html           # Homepage
```

## Advanced Usage

For more control, you can use the full attribution layout:

```yaml
---
layout: attribution
title: "Custom Title"
description: "Custom description for SEO"
channel: "channel/name"
total_clips: 219
video_url: "https://www.youtube.com/watch?v=VIDEO_ID"
tags: ["tag1", "tag2"]
date: 2025-01-24
---
```

## License

All attributions belong to their respective creators.