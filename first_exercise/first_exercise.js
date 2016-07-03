// 1 and 2 are not multiples of, at least, 3
 for (var i = 3; i <= 100; i++) {
     if (i % 3 === 0) {
        // could have used another way to "show" the information
         if (checkBizzAppz(i))
             continue;
         console.log("Bizz");
     }   
     else if (i % 5 === 0) {
         if (checkBizzAppz(i))
             continue;
         console.log("Appz");
     }   
     else {
         console.log(i);
     }   
 }

function checkBizzAppz(i) {
    if ((i % 3 === 0) && (i % 5 === 0)) {
        console.log("BizzAppz");
        return true;
    }   
}
