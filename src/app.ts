import { Component } from './components/component.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { ImageComponent } from './components/pages/item/image.js';
// import { NoteComponent } from './components/pages/item/note.js';
// import { TodoComponent } from './components/pages/item/todo.js';
// import { VideoComponent } from './components/pages/item/video.js';
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

		// const buttonVideo = document.querySelector(
		// 	'#new-video'
		// )! as HTMLButtonElement;
		// const buttonNote = document.querySelector(
		// 	'#new-note'
		// )! as HTMLButtonElement;
		// const buttonTodo = document.querySelector(
		// 	'#new-todo'
		// )! as HTMLButtonElement;

		// const image = new ImageComponent(
		// 	'Image Title',
		// 	'Image Description',
		// 	'https://picsum.photos/600/300'
		// );
		// const video = new VideoComponent(
		// 	'Video Title',
		// 	'Video Description',
		// 	'https://www.youtube.com/watch?v=VPpG0yy8Cbk'
		// );
		// const note = new NoteComponent('Note Title', 'Note Description');
		// const todo = new TodoComponent('Todo Title', 'Todo Description');

		// buttonImage.addEventListener('click', () => {
		// 	const dialog = new InputDialog();
		// 	const inputSection = new MediaSectionInput();
		// 	dialog.addChild(inputSection);
		// 	dialog.attachTo(dialogRoot);

		// 	dialog.setOnCloseListener(() => {
		// 		dialog.removeFrom(dialogRoot);
		// 	});
		// 	dialog.setOnSubmitListener(() => {
		// 		// 섹션 만들어서 나중에 페이지에 추가
		// 		const image = new ImageComponent(
		// 			inputSection.title,
		// 			inputSection.body,
		// 			inputSection.url
		// 		);
		// 		this.page.addChild(image);
		// 		dialog.removeFrom(dialogRoot);
		// 	});
		// 	dialog.attachTo(dialogRoot);
		// });
		this.bindElementToDialog<MediaSectionInput>(
			'#new-image',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new ImageComponent(input.title, input.body, input.url),
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
				const createdComponent = createComponent(inputSection)
				this.page.addChild(createdComponent);
				dialog.removeFrom(dialogRoot);
			});
			dialog.attachTo(dialogRoot);
		});
	}
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
