/** Находит и возвращает HTML-элемент по заданному селектору
 * @param {string} selector - селектор класса или идентификатора элемента
 * @param {Document | HTMLElement} [container=document] - целевой контейнер для поска (по умолчанию document)
 * @returns {HTMLElement | null}
 */
export function getElement(selector, container = document) {
    const element = container.querySelector(selector);
    if(element === null) throw new Error('error: element not found');
    return element;
}