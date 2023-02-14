import {Link, Outlet} from "react-router-dom";
import '../../main.css';

const InfoPage = () => {
    return(

        <div style={{width: '100%', height: '600px',margin: '20px', display: 'flex',}}>
            <div style={{width: '50%', display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <div style={{width: '80%',fontSize: '25px'}}>
                    На нашем сайте мы предоставляем услуги
                    по сервисному обслуживанию гарантийному и после гарантийный:
                    <li>Стиральных машин</li>
                    <li>Холодильников</li>
                    <li>Микроволновых печей</li>
                    <li>Кофемашин</li>
                    <li>Посудомоечные машины</li>
                    И продаже
                    <li>Холодильников</li>
                    <li>Стиральных машин</li>
                    <li>Варачных панелей</li>
                    <li>Духовые шкафы</li>

                </div>
            </div>
            <div style={{width: "50%"}}>
                <div style={{width: '80%',fontSize: '25px'}}>
                    <iframe style={{borderRadius:'50px 50px 50px 50px',marginTop:'50px'}}
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Abff9f1ac217f2a9dc341a55d6c32aac79c107ec9c2e040c295e225ecef581fda&amp;source=constructor"
                        width="500" height="400" frameBorder="0"></iframe>
                     </div>
            </div>
        </div>


)
}
export {InfoPage};