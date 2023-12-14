1. Every apis are protected so it can be only use for login users.

Steps

1. Open postman
2. Import api collection ( you can see all apis in details)
3. Create account using register api
4. Login api using email and password
5. WHile testing other apis, you need to pass the authorization token ,
    that is getting from login or registration api, this token needs to 
    add in the header section of postman with key name of authorization