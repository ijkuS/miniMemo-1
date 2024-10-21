//function to filter and edit a page-item
export function editPageItem(itemId: string) {
	// Get the list item element by ID
	const pageItem = document.getElementById(itemId);
	if(!pageItem){
	   console.error('Page item not found');
	   return;
	}
	// // Get the 'page-item__body' section
	const bodySection = pageItem?.querySelector('.page-item__body');
	if(!bodySection){
	   console.error('No body section found in page item');
	   return;
	}
	if (pageItem && bodySection) {
		//check if its' a media-input page item(image/video)
		const mediaInput = bodySection.querySelector('.image, .video');
		if (mediaInput) {
			const title =
				mediaInput.querySelector('.image__title, .video__title')
					?.textContent || '';
			const body =
				mediaInput.querySelector(
					'.image__description, .video__description'
				)?.textContent || '';
			const url =
				mediaInput
					.querySelector('img, iframe')
					?.getAttribute('src') || '';
			console.log('Editing media page item:', { title, body, url });
		}
	}
}
