$(function() {
    $(document).scroll(function () {
        console.log('eh');
        console.log($(this).scrollTop());
    });
});

function sum(value1, value2) {
  return value1 + value2;
}
module.exports = sum;