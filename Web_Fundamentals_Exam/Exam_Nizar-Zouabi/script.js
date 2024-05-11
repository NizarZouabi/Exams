var imageswitch = document.querySelector("#succulents");

imageswitch.addEventListener('mouseenter',()=>{
    imageswitch.src = `assets/succulents-2.jpg`
});

imageswitch.addEventListener('mouseleave',()=>{
    imageswitch.src = `assets/succulents-1.jpg`
});

var pop = document.querySelector(".cookies-popup");
var button = document.querySelector("#bttn");

function removeAll(){
    pop.remove(button);
};