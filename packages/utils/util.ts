export function debounce(fn, delay) {
    let timer:any = null;
    return function () {
      timer && clearTimeout(timer);
      timer = null;
      
      const args = arguments;
      const context = this;
      timer = setTimeout(() => {
        fn.call(context, args);
      }, delay);
    }
  }