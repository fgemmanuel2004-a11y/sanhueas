window.addEventListener("load",()=>{
 const loader=document.getElementById("loader");
 const menu=document.getElementById("menu");
 setTimeout(()=>{
   loader.classList.add("hidden");
   menu.classList.remove("hidden");
 },1200);

 document.getElementById("playBtn").addEventListener("click",()=>{
   alert("Módulo 1 - Parte 1\nEn la siguiente parte cargaremos el motor del juego.");
 });
});
