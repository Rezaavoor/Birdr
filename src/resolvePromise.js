export default function resolvePromise(promise, promiseState) {
  promiseState.promise = promise;
  promiseState.data = null;
  promiseState.error = null;

  if (!promise) {
    return;
  }

  promise.then(successACB, rejectACB).catch(failureACB);

  function successACB(data) {
    if (promiseState.promise === promise) {
      promiseState.data = data;
    }
  }
  function failureACB(error) {
    if (promiseState.promise === promise) {
      promiseState.error = error;
    }
  }
  function rejectACB(error) {
    if (promiseState.promise === promise) {
      promiseState.error = error;
    }
  }
}
