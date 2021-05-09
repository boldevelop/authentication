const addedListeners = {}

/** Avoid multiple same listeners
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Multiple_identical_event_listeners
 * */
export const addWindowListenerIfNone = (eventType, callback) => {
  if (addedListeners[eventType]) return
  addedListeners[eventType] = callback
  document.addEventListener(eventType, callback)
}
