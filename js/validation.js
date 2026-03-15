
"use strict";

/* errores */

function mostrarError(campoId, mensaje) {

const campo = document.querySelector(`#${campoId}`);
const span = document.querySelector(`#error-${campoId}`);

campo.classList.add("invalido");
campo.classList.remove("valido");

span.textContent = mensaje;
span.classList.add("visible");

}

/* limpiar errores */

function limpiarError(campoId){

const campo = document.querySelector(`#${campoId}`);
const span = document.querySelector(`#error-${campoId}`);

campo.classList.remove("invalido");
campo.classList.add("valido");

span.textContent = "";
span.classList.remove("visible");

}

/* limiar todo el formulario */

function limpiarTodo(){

["nombre","email","password","confirmar","telefono"]
.forEach(id => limpiarError(id));

}

/*validar formulario */

function validarNombre(){

const campo = document.querySelector("#nombre");

if(campo.validity.valueMissing){
mostrarError("nombre","El nombre es obligatorio");
return false;
}

if(campo.validity.tooShort){
mostrarError("nombre","Debe tener mínimo 3 caracteres");
return false;
}

limpiarError("nombre");
return true;

}

function validarEmail(){

const campo = document.querySelector("#email");

if(campo.validity.valueMissing){
mostrarError("email","El correo es obligatorio");
return false;
}

if(campo.validity.typeMismatch){
mostrarError("email","Correo no válido");
return false;
}

limpiarError("email");
return true;

}

function validarPassword(){

const campo = document.querySelector("#password");

if(campo.validity.valueMissing){
mostrarError("password","La contraseña es obligatoria");
return false;
}

if(campo.validity.tooShort){
mostrarError("password","Debe tener mínimo 8 caracteres");
return false;
}

const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

if(!regex.test(campo.value)){
mostrarError("password","Debe tener una mayúscula y un número");
return false;
}

limpiarError("password");
return true;

}

function validarConfirmar(){

const password = document.querySelector("#password").value;
const confirmar = document.querySelector("#confirmar").value;

if(!confirmar){
mostrarError("confirmar","Debe confirmar la contraseña");
return false;
}

if(password !== confirmar){
mostrarError("confirmar","Las contraseñas no coinciden");
return false;
}

limpiarError("confirmar");
return true;

}

function validarTelefono(){

const campo = document.querySelector("#telefono");

if(!campo.value.trim()){
limpiarError("telefono");
return true;
}

if(campo.validity.patternMismatch){
mostrarError("telefono","Solo números entre 7 y 15");
return false;
}

limpiarError("telefono");
return true;

}

/* validacion tiempo real */

document.querySelector("#nombre")
.addEventListener("blur", validarNombre);

document.querySelector("#email")
.addEventListener("blur", validarEmail);

document.querySelector("#password")
.addEventListener("blur", validarPassword);

document.querySelector("#confirmar")
.addEventListener("blur", validarConfirmar);

document.querySelector("#telefono")
.addEventListener("blur", validarTelefono);

/* controlar el envio del formulario */

const form = document.querySelector("#form-registro");

form.addEventListener("submit", (e)=>{

e.preventDefault();

const resultados = [

validarNombre(),
validarEmail(),
validarPassword(),
validarConfirmar(),
validarTelefono()

];

const todoValido = resultados.every(r => r === true);

if(todoValido){

const mensaje = document.querySelector("#mensaje-exito");

mensaje.classList.remove("oculto");
mensaje.classList.add("visible");

setTimeout(()=>{

form.reset();
limpiarTodo();

mensaje.classList.remove("visible");
mensaje.classList.add("oculto");

},2000);

}else{

const primerError = form.querySelector(".invalido");

if(primerError) primerError.focus();

}

});

