export function updatePageItem(itemId, filteredData) {
    const pageItem = document.getElementById(itemId);
    const bodySection = pageItem === null || pageItem === void 0 ? void 0 : pageItem.querySelector('.page-item__body');
    if (!pageItem || !bodySection) {
        console.error('There is no pageItem or bodySection');
        return;
    }
    const mediaElement = bodySection.querySelector('.image, .video');
    const textElement = bodySection.querySelector('.todo, .note');
    if ('url' in filteredData && mediaElement) {
        const titleElement = mediaElement.querySelector('.image__title, .video__title');
        const bodyElement = mediaElement.querySelector('.image__description, .video_description');
        const urlElement = mediaElement.querySelector('img, iframe');
        if (titleElement)
            titleElement.textContent = filteredData.title;
        if (bodyElement)
            bodyElement.textContent = filteredData.body;
        if (urlElement)
            urlElement.textContent = filteredData.url;
    }
    else {
        if (textElement) {
            const titleElement = textElement.querySelector('.todo__title, .note__title');
            const bodyElement = textElement.querySelector('.todo__description, .note__description');
            if (titleElement)
                titleElement.textContent = filteredData.title;
            if (bodyElement)
                bodyElement.textContent = filteredData.body;
        }
    }
}
