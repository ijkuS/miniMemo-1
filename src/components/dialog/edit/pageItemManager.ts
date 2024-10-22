// a function to store the updated data after editing.
// to separate the logic for handling the data update from the UI code.
// track with itemId and updatedData -> store as an array or object

import { MediaData, TextData } from '../dialog';

export function updatePageItem(
	itemId: string,
	updatedData: MediaData | TextData
): void {
	const pageItem = document.getElementById(itemId);
	const bodySection = pageItem?.querySelector('.page-item__body');

	if (!pageItem || !bodySection) {
		console.error('There is no pageItem or bodySection');
		return; // Ensure a return in case of missing elements
	}
	const mediaElement = bodySection.querySelector('.image, .video');
	const textElement = bodySection.querySelector('.todo, .note');

	//check if it's a media item (image/video)
	if ('url' in updatedData && mediaElement) {
		const titleElement = mediaElement.querySelector(
			'.image__title, .video__title'
		);
		const bodyElement = mediaElement.querySelector(
			'.image__description, .video_description'
		);
		const urlElement = mediaElement.querySelector('img, iframe');

		//update title, body, and URL
		if (titleElement) titleElement.textContent = updatedData.title;
		if (bodyElement) bodyElement.textContent = updatedData.body;
		if (urlElement) urlElement.textContent = updatedData.url;
	} else {
		// it's text-based item (todo/note)
		if (textElement) {
			const titleElement = textElement.querySelector(
				'.todo__title, .note__title'
			);
			const bodyElement = textElement.querySelector(
				'.todo__description, .note__description'
			);

			// Update title and body
			if (titleElement) titleElement.textContent = updatedData.title;
			if (bodyElement) bodyElement.textContent = updatedData.body;
		}
	}
}
