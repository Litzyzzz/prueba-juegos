const basuraItems = [
{ id: "banano", src:"src/BAN.png", type: "organic" },
{ id:"carton", src:"src/CARTON.png", type: "paper" },
{ id:"botella", src: "src/BOTELLA.png", type: "plastic" },
{ id:"cerveza", src: "src/CERVE.png", type: "glass" },


];

let currentIndex = 0;
const basuraContainer = document.getElementById("basura-container");
const botes = document.querySelectorAll(".bote");
const mensaje = document.getElementById("message");
const nextButton = document.getElementById("next-btn");

function cargarBasuraItem(index){
    basuraContainer.innerHTML = `
    <img src="${basuraItems[index].src}"
    id="${basuraItems[index].id}"
    class="basura-item"
    draggable="true"
    data-type="${basuraItems[index].type}">`;
    añadirDragEvents();
    nextButton.style.display = "none";
}

function añadirDragEvents(){
    const basuraItem = document.querySelector(".basura-item");
    basuraItem.addEventListener("dragstart", (event)=>{
        event.dataTransfer.setData("text", event.target.dataset.type);
        event.dataTransfer.setData("id", event.target.id);
    });
}
botes.forEach(bote =>{
    bote.addEventListener("dragover",(event)=>{
        event.preventDefault();
    });
    bote.addEventListener("drop",(event)=>{
        event.preventDefault();
        const basuraType = event.dataTransfer.getData("text");
        const basuraId = event.dataTransfer.getData("id");
        if (basuraType===bote.dataset.type){
            mensaje.textContent = "¡Correcto!";
            document.getElementById(basuraId).style.display = "none";
            nextButton.style.display = "block";
        } else{
            mensaje.textContent = "¡Intenta de nuevo!";
        }
        });
    });

nextButton.addEventListener("click",()=>{

    currentIndex++;
    if (currentIndex < basuraItems.length){
        cargarBasuraItem(currentIndex);
        mensaje.textContent = "";
    }else{
        mensaje.textContent = "¡Has identificado todos los tipos!";
        nextButton.style.display = "none";
    }
});
cargarBasuraItem(currentIndex);   
   