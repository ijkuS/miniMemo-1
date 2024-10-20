import { Component } from './components/component.js';
import { InputDialog } from './components/dialog/dialog.js';
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

type InputComponentConstructor<T extends Component> = {
	new (): T;
};
class App {
	// private readonly page: PageComponent;
	private readonly page: Component & Composable;
	constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent);
		this.page.attachTo(appRoot);

		this.bindElementToDialog<MediaSectionInput>(
			'#new-image',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new ImageComponent(input.title, input.body, input.url),
			dialogRoot
		);
		this.bindElementToDialog<MediaSectionInput>(
			'#new-video',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new VideoComponent(input.title, input.body, input.url),
			dialogRoot
		);
		this.bindElementToDialog<TextSectionInput>(
			'#new-note',
			TextSectionInput,
			(input: TextSectionInput) =>
				new NoteComponent(input.title, input.body),
			dialogRoot
		);
		this.bindElementToDialog<TextSectionInput>(
			'#new-todo',
			TextSectionInput,
			(input: TextSectionInput) =>
				new TodoComponent(input.title, input.body),
			dialogRoot
		);
	}
	private bindElementToDialog<T extends Component>(
		selector: string,
		InputComponent: InputComponentConstructor<T>,
		createComponent: (input: T) => Component,
		dialogRoot: HTMLElement
	) {
		const button = document.querySelector(selector)! as HTMLButtonElement;
		button.addEventListener('click', () => {
			const dialog = new InputDialog();
			const inputSection = new InputComponent();
			dialog.addChild(inputSection);

			dialog.setOnCloseListener(() => {
				dialog.removeFrom(dialogRoot);
			});
			dialog.setOnSubmitListener(() => {
				const createdComponent = createComponent(inputSection);
				this.page.addChild(createdComponent);
				dialog.removeFrom(dialogRoot);
			});
			dialog.attachTo(dialogRoot);
		});
	}
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
