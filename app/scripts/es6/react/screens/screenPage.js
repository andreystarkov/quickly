/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:24:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-05-07 20:34:01
*/

import LoadingOrderAnimation from 'react-loading-order-with-animation';

var MainPageHeader = require('../mainPage.react.jsx');

var ScreenPage = React.createClass({
    render: function(){
        return (
            <section className="the-screen page-wrapper" id="pageMain">

                <div className="container box-content">
                <h2>Условия акции «Сытая пятница»</h2>

                <div className="video-container"><iframe src="//vk.com/video_ext.php?oid=-90447492&id=456239031&hash=23013d88bb8c0897&hd=2" width="853" height="480"  frameborder="0"></iframe></div>

                <p>Суть акции «Сытая пятница» заключается в том, что 20 мая 2016 года в период с 17:00 до 21:00 доставку еды, заказанной через приложение “Quickly”, будет осуществлять фотограф и блогер Денис Насаев. Доставка будет осуществляться на автомобиле, обозначенном логотипами компании и партнеров проекта. Будет вестись фото- и видеосъемка события. Вдобавок к оплаченному заказу участник может получить подарки и сувениры от компании “Quickly”, а также от партнеров акции.</p>

                <p>1. Участником акции «Сытая пятница» может стать любой житель Оренбурга не моложе 18-ти лет, установивший в своем мобильном устройстве приложение “Quickly” до 20 мая 2016 года.</p>
                <p>2. В пятницу 20 мая 2016 года в период с 17:00 до 21:00 необходимо сделать заказ на доставку еды, используя приложение “Quickly”, на сумму не менее 500 рублей.</p>
                <p>3. Выбор участника акции производится случайным образом в зависимости от загруженности команды доставки.</p>
                <p>4. Если вам повезло стать участником, на которого пал выбор призовой доставки, команда доставки предварительно известит вас телефонным звонком. Вы имеете право отказаться от призовой доставки. Своим согласием вы подтверждаете право команды доставки вести фото- и видеосъемку вручения заказа и подарков, а также использовать полученные фото- и видеоматериалы по своему усмотрению.</p>
                <p>5. Вручение заказа и подарков производится по адресу, указанному в заказе.</p>
                </div>
            </section>
        )
    }
});

module.exports = ScreenPage;


