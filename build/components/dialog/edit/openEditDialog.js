import { InputDialog } from '../dialog.js';
import { MediaSectionInput } from '../input/media-input.js';
import { TextSectionInput } from '../input/text-input.js';
import { updatePageItem } from './updatePageItem.js';
export function openEditDialog(itemId, filteredData, dialogRoot) {
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
        const updatedData = 'url' in inputComponent
            ? {
                title: inputComponent.title,
                body: inputComponent.body,
                url: inputComponent.url,
            }
            : {
                title: inputComponent.title,
                body: inputComponent.body,
            };
        updatePageItem(itemId, updatedData);
        editDialog.removeFrom(dialogRoot);
    });
}
