if (localStorage.getItem("token")) {
    window.location.href = "../busqueda/index.html"
}
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.login100-form-btn').on('click',function(){
        let check = true
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false
            }
        }
        if (check){
            var user = input[0].value
            var pass = input[1].value
    
            axios({
                method: "post",
                url: "http://localhost:3000/login/login",
                data: {
                    correo: user,
                    password: pass,
                },
            }).then(
                function (res) {
                    if(res.data.code == 200){
                        localStorage.setItem("token", JSON.stringify(res.data.message))
                        window.location.href = "../busqueda/index.html"
                    }
                    else{
                        alert(res.data.message)
                    }
                }
            ).catch(
                function (err){
                    console.log(err)
                }
            )
        }

    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);