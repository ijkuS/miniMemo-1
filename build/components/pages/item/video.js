import { BaseComponent } from '../../component.js';
export class VideoComponent extends BaseComponent {
    constructor(title, body, url) {
        super(`<section class="video">
               <div class="video__player">
                  <iframe class="video__iframe" frameborder="0"></iframe>
               </div>
					<div class="text__holder">
						<h2 class="video__title"></h2>
						<p class="video__description"></p>
					</div>
             </section>`);
        const iframe = this.element.querySelector('.video__iframe');
        iframe.src = this.convertToEmbeddedURL(url);
        console.log(iframe.src);
        const titleElement = this.element.querySelector('.video__title');
        titleElement.textContent = title;
        const bodyElement = this.element.querySelector('.video__description');
        bodyElement.textContent = body;
    }
    convertToEmbeddedURL(url) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);
        const videoId = match ? match[1] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}
