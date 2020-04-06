const app = new Vue({
    el: '#form',
    data:{
        vusername: '',
        vemail: '',
        vpassword: '',
        vconfpasswd: ''

    },
    methods:{
        agregarusuario: function() {
            console.log(this.vusername);
            console.log(this.vemail);
            console.log(this.vpassword);
            console.log(this.vconfpasswd);
            if(this.vpassword === this.vconfpasswd){
                //meter a la base de datos
            }else{
                console.log('error');
                alert('Las contraseñas no coinciden');
            }
            
        }
    }

});