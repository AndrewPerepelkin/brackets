module.exports = function check(str, bracketsConfig) {
  const stack = [];
  let hasError = false;

  const isOpenBracket = (char) => bracketsConfig.some((tuple) => tuple[0] === char);
  const isCloseBracket = (char) => !isOpenBracket(char);
  const isTuple = (char1, char2) => bracketsConfig.some((tuple) => tuple[0] === char1 && tuple[1] === char2);

  const addToStack = (char) => {
    if (stack.length > 0) {
      const lastStackChar = stack[stack.length - 1];
      if (isTuple(lastStackChar, char)) {
        stack.pop();
      } else if (isOpenBracket(char)) {
        stack.push(char);
      } else {
        hasError = true;
      }
    } else if (isCloseBracket(char)) {
      hasError = true;
    } else {
      stack.push(char);
    }
  };

  str.split('').forEach((char) => {
    addToStack(char);
  });

  if (hasError || (stack.length > 0)) {
    return false;
  }
  return true;

}