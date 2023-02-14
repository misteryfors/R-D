import React from 'react'
import mail from './image/mail.PNG'
import twitter from './image/tt.PNG'
import telegram from './image/tg.PNG'
import './css/Footer.css'
export default function Footer(){
    return(
        <footer id="footer">
            <div className="linkbox">
                <img src={mail}/>
                <div>
                    <a>
                        MailMyAccaunt
                    </a>
                </div>
            </div>
            <div className="linkbox">
                <img src={twitter}/>
                <div>
                    <a>
                        TwiterMyAccaunt
                    </a>
                </div>
            </div>
            <div className="linkbox">
                <img src={telegram}/>
                <div>
                    <a>
                        TgMyAccaunt
                    </a>
                </div>
            </div>
        </footer>
    )
}