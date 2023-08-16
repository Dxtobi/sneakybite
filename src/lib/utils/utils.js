export const serializeNonPOJOs = (/** @type {any} */ obj) => {
  const f = JSON.stringify(obj);
  
  return JSON.parse(f)
   // return structuredClone(obj)
}


/**
 * @param {string | any[] | undefined} array
 * @param {any} searchString
 */
export function searchArray(array, searchString) {
  if (array != undefined) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === searchString) {
        return true;
      }
    }
  } 
  return false;
}



export let ToCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',
});