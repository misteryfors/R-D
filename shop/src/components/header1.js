new Vue(
    {
        el:'#header',
        data:{
            buttons:
                [
                    {id:'logo',class:'',url:'/info',name:'',img:'css/DaR.png'},
                    {id:'info',class:'hover',url:'/info',name:'О нас',img:''},
                    {id:'shop',class:'',url:'/shop',name:'Ремонт и Покупка',img:''},
                    {id:'account',class:'',url:'/profile',name:'Имя пользователя',img:'css/profile.PNG'}
                ]
        },
        filters: {

        },
        template:
            '<header>' +
                '<a v-for="button in buttons":href="button.url" >' +
                    '<div class="" style="color: black" :id="button.id">' +
                        '<img :src="button.img">{{button.name}}' +
                    '</div>' +
                '</a>' +
            '</header>',

    }
)