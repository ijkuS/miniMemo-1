import { InputDialog, MediaData, TextData } from '../dialog.js';
import { MediaSectionInput } from '../input/media-input.js';
import { TextSectionInput } from '../input/text-input.js';
import { updatePageItem } from './updatePageItem.js';

// opening the dialog
// adding the prropriate input component (media or text)
// Handling submission and updating the page item
// closing the dialog
export function openEditDialog(
	itemId: string,
	filteredData: MediaData | TextData,
	dialogRoot: HTMLElement
) {
	const isMediaData = 'url' in filteredData;
	const inputComponent = isMediaData
		? new MediaSectionInput(filteredData)
		: new TextSectionInput(filteredData);

	const editDialog = new InputDialog(true, filteredData);
	editDialog.addChild(inputComponent);
	editDialog.attachTo(dialogRoot);

	editDialog.setOnCloseListener(() => {
		editDialog.removeFrom(dialogRoot);
	});

	editDialog.setOnEditSubmitListener(() => {
		// how to determine a case if updatedData is MediaData?
		// (casting was not working)
		const updatedData =
			'url' in inputComponent
				? {
						title: (inputComponent as MediaData).title,
						body: (inputComponent as MediaData).body,
						url: (inputComponent as MediaData).url,
				  }
				: {
						title: inputComponent.title,
						body: inputComponent.body,
				  };

		updatePageItem(itemId, updatedData); // pass updated Data
		editDialog.removeFrom(dialogRoot);
	});
}
