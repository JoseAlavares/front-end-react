const validateEmail = (email) => {
    const pattern = RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);

    if(!pattern.test(email)) {
        return false
    }

    return true;
};

const confirmPassword = (password, repeatPassword) => {
    if(password.toLowerCase() === repeatPassword.toLowerCase() ){
        return true;
    }

    return false;
};

export { 
    validateEmail,
    confirmPassword
};