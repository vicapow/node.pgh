var i = 10 ;
function test(){
    if(false) var i = true;
    return i;
}
console.log(test());