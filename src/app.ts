import { Component } from './components/component.js';
import { bindElementToDialog } from './components/dialog/bindElementToDialog.js';

import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/pages/item/image.js';
import { NoteComponent } from './components/pages/item/note.js';
import { TodoComponent } from './components/pages/item/todo.js';
import { VideoComponent } from './components/pages/item/video.js';

import {
	Composable,
	PageComponent,
	PageItemComponent,
} from './components/pages/page.js';

// type InputComponentConstructor<T extends (MediaData | TextData) & Component> = {
// 	new (initialData?: T extends MediaData ? MediaData : TextData): T;
// };

class App {
	private readonly page: Component & Composable;
	constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent, this.dialogRoot);
		this.page.attachTo(appRoot);

		// mock-up data for TEST ---------------------------------------------
		const mockupData1 = new ImageComponent(
			'image title',
			'image body',
			'https://images.unsplash.com/photo-1632852702313-f49135ab8c94?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
		);
		const mockupData2 = new NoteComponent('Note title', 'Note body');
		const mockupData3 = new VideoComponent(
			'Video title',
			'Video body',
			'https://www.youtube.com/watch?v=wxnsKBFsPTU'
		);
		const mockupData4 = new TodoComponent(
			'Work hard',
			'Study 8 hours a day'
		);
		this.page.addChild(mockupData1);
		this.page.addChild(mockupData2);
		this.page.addChild(mockupData3);
		this.page.addChild(mockupData4);

		// -------------------------------------------------------------------

		bindElementToDialog<MediaSectionInput>(
			'#new-image',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new ImageComponent(input.title, input.body, input.url),
			this.page
		);
		bindElementToDialog<MediaSectionInput>(
			'#new-video',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new VideoComponent(input.title, input.body, input.url),
			this.page
		);
		bindElementToDialog<TextSectionInput>(
			'#new-note',
			TextSectionInput,
			(input: TextSectionInput) =>
				new NoteComponent(input.title, input.body),
			this.page
		);
		bindElementToDialog<TextSectionInput>(
			'#new-todo',
			TextSectionInput,
			(input: TextSectionInput) =>
				new TodoComponent(input.title, input.body),
			this.page
		);
	}
	// bindElementToDialog<T extends (MediaData | TextData) & Component>(
	// 	selector: string,
	// 	InputComponent: InputComponentConstructor<T>,
	// 	createComponent: (input: T) => Component,
	// 	existingComponent?: Component,
	// 	initialData?: T extends MediaData ? MediaData : TextData
	// ) {
	// 	const button = document.querySelector(selector)! as HTMLButtonElement;
	// 	button.addEventListener('click', () => {
	// 		// set edit mode if existingComponent is provided
	// 		const dialog = new InputDialog(!!existingComponent, initialData);

	// 		const inputSection = new InputComponent(initialData);
	// 		dialog.addChild(inputSection);

	// 		dialog.setOnCloseListener(() => {
	// 			dialog.removeFrom(this.dialogRoot);
	// 		});
	// 		dialog.setOnSubmitListener(() => {
	// 			const createdComponent = createComponent(inputSection);
	// 			this.page.addChild(createdComponent);
	// 			dialog.removeFrom(this.dialogRoot);
	// 		});

	// 		dialog.attachTo(this.dialogRoot);
	// 	});
	// }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
