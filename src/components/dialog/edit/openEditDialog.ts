import { InputDialog, MediaData, TextData } from '../dialog.js';
import { MediaSectionInput } from '../input/media-input.js';
import { TextSectionInput } from '../input/text-input.js';

// opening the dialog
// adding the prropriate input component (media or text)
// Handling submission and updating the page item
// closing the dialog
export function openEditDialog(
	itemId: string,
	filteredData: MediaData | TextData,
	dialogRoot: HTMLElement
) {
	console.log(itemId, 'this is from function openEditDialog');
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
	// editDialog.setOnSubmitListener(
	// 	(updatedData: MediaData | TextData) => {
	// 		//update the item in the DOM with the new data
	// 		onSubmit(updatedData);
	//       editDialog.removeFrom(dialogRoot)
	// 	}
	// );
}
