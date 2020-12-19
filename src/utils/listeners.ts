// @ts-ignore
document.addedListeners = {}

/** Избежание повторного назначения слушателя,
 * хотя на mdn говорится, что можно не избегать
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Multiple_identical_event_listeners
 * */
export const addWindowListenerIfNone = (eventType, fun) => {
  // @ts-ignore
  if (document.addedListeners[eventType]) return
  // @ts-ignore
  document.addedListeners[eventType] = fun
  document.addEventListener(eventType, fun)
}
