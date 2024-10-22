import { MediaData, TextData } from '../dialog';

// function to check and filter existing memo items with itemId
// if (itemId) in the current list
// -> check if it is MediaData type or TextData by checking existence of 'url'
// -> Q. (check if using interface MediaData or TextData?)

// if ()-> get the data(title, body, url?)
// Edit a page-item
// Reride the data of a page-item

//Q. Can I use bindElementToDialog infra here? (app.ts) since it seems similar

export function filterExistingItems(
	itemId: string
): MediaData | TextData | undefined {
	// if (itemId) in the current list
	// -> check if it is MediaData type or TextData by checking existence of 'url'
	try {
		const pageItem = document.getElementById(itemId);
		const bodySection = pageItem?.querySelector('.page-item__body');
		if (!pageItem || !bodySection) {
			console.error('There is no pageItem or bodySection');
			return undefined; // Ensure a return in case of missing elements
		}
		const mediaInput = bodySection.querySelector('.image, .video');
		const textInput = bodySection.querySelector('.todo, .note');

		if (pageItem && bodySection) {
			if (mediaInput) {
				const title =
					mediaInput.querySelector(
						'.image__title, .video__title'
					)?.textContent || '';
				const body =
					mediaInput.querySelector(
						'.image__description, .video_description'
					)?.textContent || '';
				const url =
					mediaInput
						.querySelector('img, iframe')
						?.getAttribute('src') || '';

				const filteredMediaData: MediaData = { title, body, url };
				console.log('Editing media page item:', filteredMediaData);

				return filteredMediaData;
			}
			if (textInput) {
				const title =
					textInput.querySelector('.todo__title, .note__title')
						?.textContent || '';
				const body =
					textInput.querySelector(
						'.todo__description, .note__description'
					)?.textContent || '';

				const filteredTextData: TextData = { title, body };
				console.log('Editing text page item:', filteredTextData);

				return filteredTextData;
			}
		}
		// If neither mediaInput nor textInput is found, return undefined
		console.warn('No media or text input found for the page item');
		return undefined; // without this, TS keeps warning that Not all code paths return a value.ts(7030)
	} catch (error) {
		console.error(
			'There is something wrong filtering existing items',
			error
		);
		return undefined;
	}
}
