let arrayVal = [4, 1, 3, 2, 7];

function callValAtInterval(arrayVal) {
  for (var i = 0; i < arrayVal.length; i++) {
    (function (i) {
      setTimeout(function () {
        console.log(arrayVal[i]);
      }, 1000 * i);
    })(i);
  }
}
