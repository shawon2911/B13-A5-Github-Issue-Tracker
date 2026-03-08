document.getElementById('login-btn').addEventListener('click', () =>{
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value ;
    // console.log(username);
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput.value;

    if(username == "admin"){
        if(password == "admin123"){
            window.alert("Login Successfull");
            window.location.assign("home.html");
        }
        else{
             window.alert("Wrong Password");
             return;
        }
    }
    else{
        window.alert("Wrong Username");
        return;
    }
})