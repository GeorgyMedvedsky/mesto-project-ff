/** Находит и возвращает элемент по заданному селектору
 * @param {string} selector - селектор класса или идентификатора элемента
 * @param {Document | HTMLElement} [container=document] - целевой контейнер для поска (по умолчанию document)
 * @returns {HTMLElement | null}
 */
export function getElement(selector, container = document) {
    const element = container.querySelector(selector);
    if(element === null) throw new Error('error: element not found');
    return element;
}

/** Контейнер для вставки карточек на странице
 * @type {HTMLElement}
*/
const cardsContainer = getElement('.places__list');
/** Отвечает за отрисовку карточек на странице
 * @param {HTMLElement} card - разметка готовой карточки
 * @param {HTMLElement} container - родительский элемент для отрисовки (по умолчанию равен cardsContainer)
 */
export function renderCard(card, container = cardsContainer) {
    container.prepend(card);
}