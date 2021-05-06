var errorBox = document.getElementById('error');
var password = document.getElementById('password');
var confirm_password = document.getElementById('confirm-password');


function checkPassword(){

    if(password.value === confirm_password.value){

        confirm_password.style.color = "green";
        confirm_password.style.borderBottom = "1px solid blue";
    
    }

    else{

        confirm_password.style.color = "red";
        confirm_password.style.fontSize = "medium";
        confirm_password.style.borderBottom = "2px solid red";

    }
}