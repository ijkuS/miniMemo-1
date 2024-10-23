export function editPageItem(itemId) {
    var _a, _b, _c;
    const pageItem = document.getElementById(itemId);
    if (!pageItem) {
        console.error('Page item not found');
        return;
    }
    const bodySection = pageItem === null || pageItem === void 0 ? void 0 : pageItem.querySelector('.page-item__body');
    if (!bodySection) {
        console.error('No body section found in page item');
        return;
    }
    if (pageItem && bodySection) {
        const mediaInput = bodySection.querySelector('.image, .video');
        if (mediaInput) {
            const title = ((_a = mediaInput.querySelector('.image__title, .video__title')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
            const body = ((_b = mediaInput.querySelector('.image__description, .video__description')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
            const url = ((_c = mediaInput
                .querySelector('img, iframe')) === null || _c === void 0 ? void 0 : _c.getAttribute('src')) || '';
            console.log('Editing media page item:', { title, body, url });
        }
    }
}
