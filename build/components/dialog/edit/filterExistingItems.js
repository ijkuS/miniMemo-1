export function filterExistingItems(itemId) {
    var _a, _b, _c, _d, _e;
    try {
        const pageItem = document.getElementById(itemId);
        const bodySection = pageItem === null || pageItem === void 0 ? void 0 : pageItem.querySelector('.page-item__body');
        if (!pageItem || !bodySection) {
            console.error('There is no pageItem or bodySection');
            return undefined;
        }
        const mediaInput = bodySection.querySelector('.image, .video');
        const textInput = bodySection.querySelector('.todo, .note');
        if (pageItem && bodySection) {
            if (mediaInput) {
                const title = ((_a = mediaInput.querySelector('.image__title, .video__title')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
                const body = ((_b = mediaInput.querySelector('.image__description, .video__description')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
                const url = ((_c = mediaInput
                    .querySelector('img, iframe')) === null || _c === void 0 ? void 0 : _c.getAttribute('src')) || '';
                const filteredMediaData = { title, body, url };
                console.log('Editing media page item:', filteredMediaData);
                return filteredMediaData;
            }
            if (textInput) {
                const title = ((_d = textInput.querySelector('.todo__title, .note__title')) === null || _d === void 0 ? void 0 : _d.textContent) || '';
                const body = ((_e = textInput.querySelector('.todo__description, .note__description')) === null || _e === void 0 ? void 0 : _e.textContent) || '';
                const filteredTextData = { title, body };
                console.log('Editing text page item:', filteredTextData);
                return filteredTextData;
            }
        }
        console.warn('No media or text input found for the page item');
        return undefined;
    }
    catch (error) {
        console.error('There is something wrong filtering existing items', error);
        return undefined;
    }
}
