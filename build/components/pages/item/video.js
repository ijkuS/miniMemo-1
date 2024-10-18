import { BaseComponent } from '../../component';
export class VideoComponent extends BaseComponent {
    constructor(title, body, url) {
        super(`<section class="video">
               <div class="video__player">
                  <iframe class="video__iframe" frameborder="0"></iframe>
               </div>
               <h2 class="video__title"></h2>
               <p class="video__description"></p>
             </section>`);
        const iframe = this.element.querySelector('video__iframe');
        iframe.src = this.convertToEmbeddedURL(url);
        const titleElement = this.element.querySelector('.video__title');
        titleElement.textContent = title;
        const bodyElement = this.element.querySelector('.video__description');
        bodyElement.textContent = body;
    }
    convertToEmbeddedURL(url) {
        const regExp = /(?:youtu\.be\/|youtube\.com\/.*[?&]v=)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        const videoId = match ? match[1] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}
