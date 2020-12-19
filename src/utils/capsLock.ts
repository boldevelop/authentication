/** Определения нажатия капслока, в глобальной переменной document
 *  чтобы избежать лишнего перерендера, при использовании контекста на формой
 * */
export const isPressedCapsLock = (event: KeyboardEvent) =>
  event.getModifierState && event.getModifierState('CapsLock')

export const setCapsIsPressedGlobal = (event: KeyboardEvent) => {
  /** See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState */
  // @ts-ignore
  document.capsIsPressed = isPressedCapsLock(event)
}

// @ts-ignore
export const getCapsIsPressed = (): boolean => document.capsIsPressed
