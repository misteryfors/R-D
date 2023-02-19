new Vue(
    {
        el:'#footer',
        data:{
            links:[
                {img:'css/mail.png',link:'MailMyAccaunt'},
                {img:'css/tt.png',link:'TwiterMyAccaunt'},
                {img:'css/tg.png',link:'TgMyAccaunt'}
            ]
        },
        template:'<footer id="footer"><div class="linkbox" v-for="image in links"><img :src="image.img"/><div><a>{{image.link}}</a></div></div></footer>'
    }
)