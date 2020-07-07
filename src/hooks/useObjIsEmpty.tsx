const objIsEmpty = (obj:object) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const useObjIsEmpty = () => {
    return objIsEmpty
  }
  
  export default useObjIsEmpty;