function Index() {};

Index.prototype.method = function () {
    console.log("a method in Index");
};

function SubIndex() {
    Index.call(this);
}

SubIndex.prototype = Object.create(Index.prototype);
SubIndex.prototype.constructor = SubIndex;

SubIndex.prototype.anotherMethod = function () {
    console.log("a method in SubIndex");
};

var aSubIndexInstance = new SubIndex();

aSubIndexInstance instanceof SubIndex
    ? console.log("aSub.. instanceof SubIndex TRUE") : console.log("aSub.. instanceof SubIndex FALSE");
aSubIndexInstance instanceof Index
    ? console.log("aSub.. instanceof Index TRUE") : console.log("aSub.. instanceof Index FALSE");

aSubIndexInstance.method();
aSubIndexInstance.anotherMethod();

