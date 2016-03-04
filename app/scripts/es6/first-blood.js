// OMG THIS IS ES6 FIRST BLOOD

function createProfileEditor(profile){

    var birthDate = moment(profile.userBirthdate, "MM-DD-YYYY");

    var htmlTemplate =
    `<div class="container">
       <div class="row">
          <div class="col-lg-2 text-center">
             <div class="avatar round">
                <img src="${profile.userAvatarUrl}" alt="...">
             </div>
             <div class="title user-name-edit">
                <div class="form-group label-placeholder is-empty">
                   <input type="email" class="form-control" id="profile-name" value="${profile.userName} ${profile.userSurname}">
                   <span class="help-block">Изменить имя пользователя</span>
                   <span class="material-input"></span>
                </div>
             </div>
          </div>
          <div class="col-lg-10 the-info">
             <div class="line delivery">
                <i class="icon icon-envelope"></i>
                <div class="box">
                   <div class="form-group is-empty tip" title="Ваш адрес электронной почты">
                      <input type="email" class="form-control" id="profile-email" value="${profile.userEmail}">
                   </div>
                </div>
                <i class="icon icon-phone"></i>
                <div class="box">
                   <div class="form-group label-placeholder is-empty">
                      <input type="tel" class="form-control tip" title="Дата вашего рождения" id="profile-phone" value="${profile.userPhone}">
                   </div>
                </div>
                <i class="icon icon-calendar"></i>
                <div class="box">
                   <div class="form-group label-placeholder is-empty tip" title="Tooltip on top">
                      <input type="date" class="form-control" id="profile-birth" value="${birthDate}">
                   </div>
                </div>
                <i class="icon fa fa-building-o"></i>
                <div class="box">
                   <div class="form-group label-placeholder is-empty">
                      <input type="text" class="form-control" id="profile-city" value="Оренбург">
                   </div>
                </div>
             </div>
             <div class="line delivery">
                <div id="profile-addresses" class="inline-block float-left">
                   <i class="icon icon-location-pin"></i>
                   <div class="box">
                      <div class="form-group label-placeholder is-empty" title="Введите адреса для доставки">
                         <input type="text" class="form-control" id="profile-address-1" value="">
                         <span class="help-block">Вы можете добавить несколько адресов</span>
                      </div>
                   </div>
                </div>
                <div class="box">
                   <a href="#" class="button button-plus tip" id="profile-address-add">
                   <i class="icon fa fa-plus-square-o"></i>
                   <span>Добавить адрес</span>
                   </a>
                </div>
             </div>
          </div>
       </div>
       <div class="row buttons-line">
          <div class="col-lg-2">
          </div>
          <div class="col-lg-10 buttons-tabs">
             <div class="btn-group btn-group-justified">
                <a data-tab="tab-order-history" href="#tab-order-history" class="tab-toggle btn button light" >
                <span>История заказов</span>
                </a>
                <a data-tab="tab-reservation-history" href="#tab-reservation-history" class="tab-toggle btn button light">
                <span>История бронирования</span>
                </a>
                <a data-tab="tab-comments-history" href="#tab-comments-history" class="tab-toggle btn button light">
                <span>Оставленные отзывы</span>
                </a>
             </div>
          </div>
       </div>
    </div>
    <section class="the-tab tab-comments the-history" id="tab-comments-history">
        <div class="container">
        <div class="history-item row">
            <div class="col-lg-2">
                <div class="box-company medium">
                    <div class="thumb-round">
                        <img src="images/logos/delmaro.png" alt="...">
                    </div>
                    <span class="title">Зеленая горчица</span>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="history-items">
                    <div class="item comment-item">
                        <div class="row">
                            <div class="col-lg-2 no-padding-right align-right">
                                <div class="thumb-tiny table-number">
                                    <span><i class="icon-speech"></i></span>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="text">
                                    <b>Всё очень грустно!</b>
                                    <p>В общем-то, научное сообщество было уверено в том, что они существуют, и обнаружить их — дело времени. Халсу и Тейлору присудили Нобелевскую
                                    премию за фактическое открытие гравитационных волн. ЧРаз они крутятся, то излучают гравитационные волны.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-lg-2 summary">
                <div class="bonus">
                    <span><i class="fa fa-rub"></i>-бонусов</span>
                    <b>+ 40</b>
                </div>
            </div>
            <div class="col-lg-3 actions">
                <span class="title">поделится:</span>
                <div class="social-share">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-vk"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                </div>
            </div>
        </div> <!-- history-item -->

        <div class="history-item row">
            <div class="col-lg-2">
                <div class="box-company medium">
                    <div class="thumb-round">
                        <img src="images/logos/delmaro.png" alt="...">
                    </div>
                    <span class="title">Зеленая горчица</span>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="history-items">
                    <div class="item comment-item">
                        <div class="row">
                            <div class="col-lg-2 no-padding-right align-right">
                                <div class="thumb-tiny table-number">
                                    <span><i class="icon-speech"></i></span>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="text">
                                    <b>Всё очень грустно!</b>
                                    <p>В общем-то, научное сообщество было уверено в том, что они существуют, и обнаружить их — дело времени. Халсу и Тейлору присудили Нобелевскую
                                    премию за фактическое открытие гравитационных волн. ЧРаз они крутятся, то излучают гравитационные волны.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-lg-2 summary">
                <div class="bonus">
                    <span><i class="fa fa-rub"></i>-бонусов</span>
                    <b>+ 40</b>
                </div>
            </div>
            <div class="col-lg-3 actions">
                <span class="title">поделится:</span>
                <div class="social-share">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-vk"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                </div>
            </div>
        </div> <!-- history-item -->

        <div class="history-item row">
            <div class="col-lg-2">
                <div class="box-company medium">
                    <div class="thumb-round">
                        <img src="images/logos/delmaro.png" alt="...">
                    </div>
                    <span class="title">Зеленая горчица</span>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="history-items">
                    <div class="item comment-item">
                        <div class="row">
                            <div class="col-lg-2 no-padding-right align-right">
                                <div class="thumb-tiny table-number">
                                    <span><i class="icon-speech"></i></span>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="text">
                                    <b>Всё очень грустно!</b>
                                    <p>В общем-то, научное сообщество было уверено в том, что они существуют, и обнаружить их — дело времени. Халсу и Тейлору присудили Нобелевскую
                                    премию за фактическое открытие гравитационных волн. ЧРаз они крутятся, то излучают гравитационные волны.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-lg-2 summary">
                <div class="bonus">
                    <span><i class="fa fa-rub"></i>-бонусов</span>
                    <b>+ 40</b>
                </div>
            </div>
            <div class="col-lg-3 actions">
                <span class="title">поделится:</span>
                <div class="social-share">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-vk"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                </div>
            </div>
        </div> <!-- history-item -->

        <div class="history-item row">
            <div class="col-lg-2">
                <div class="box-company medium">
                    <div class="thumb-round">
                        <img src="images/logos/delmaro.png" alt="...">
                    </div>
                    <span class="title">Зеленая горчица</span>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="history-items">
                    <div class="item comment-item">
                        <div class="row">
                            <div class="col-lg-2 no-padding-right align-right">
                                <div class="thumb-tiny table-number">
                                    <span><i class="icon-speech"></i></span>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="text">
                                    <b>Всё очень грустно!</b>
                                    <p>В общем-то, научное сообщество было уверено в том, что они существуют, и обнаружить их — дело времени. Халсу и Тейлору присудили Нобелевскую
                                    премию за фактическое открытие гравитационных волн. ЧРаз они крутятся, то излучают гравитационные волны.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-lg-2 summary">
                <div class="bonus">
                    <span><i class="fa fa-rub"></i>-бонусов</span>
                    <b>+ 40</b>
                </div>
            </div>
            <div class="col-lg-3 actions">
                <span class="title">поделится:</span>
                <div class="social-share">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-vk"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                </div>
            </div>
        </div> <!-- history-item -->


        </div>
    </section>


    <section class="the-tab tab-active order-history" id="tab-order-history">
        <div class="container">

        <div class="history-item row">
            <div class="col-lg-2">
                <div class="box-company medium">
                    <div class="thumb-round">
                        <img src="images/logos/delmaro.png" alt="...">
                    </div>
                    <span class="title">Зеленая горчица</span>
                </div>
            </div>
            <div class="col-lg-5">
                    <div class="history-items">
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/1-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Осетинский пирог с капустой</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/3-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Чудо-трюфели</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/2-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-2 summary">
                    <div class="total">
                        <span>итого:</span>
                        <b>4500 <i class="rouble">o</i></b>
                    </div>

                    <div class="bonus">
                        <span><i class="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
                    </div>
                </div>

                <div class="col-lg-3 actions">
                    <span class="title">поделится:</span>
                    <div class="social-share">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-vk"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                    </div>
                    <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                        <span>Повторить заказ</span>
                    </a>
                </div>
            </div>

        <div class="history-item row">
            <div class="col-lg-2">
                <div class="box-company medium">
                    <div class="thumb-round">
                        <img src="images/logos/delmaro.png" alt="...">
                    </div>
                    <span class="title">Зеленая горчица</span>
                </div>
            </div>
            <div class="col-lg-5">
                    <div class="history-items">
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/10-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Осетинский пирог с капустой</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/8-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Чудо-трюфели</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/9-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/2-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-2 summary">
                    <div class="total">
                        <span>итого:</span>
                        <b>4500 <i class="rouble">o</i></b>
                    </div>

                    <div class="bonus">
                        <span><i class="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
                    </div>
                </div>

                <div class="col-lg-3 actions">
                    <span class="title">поделится:</span>
                    <div class="social-share">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-vk"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                    </div>
                    <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                        <span>Повторить заказ</span>
                    </a>
                </div>
            </div>


        <div class="history-item row">
            <div class="col-lg-2">
                <div class="box-company medium">
                    <div class="thumb-round">
                        <img src="images/logos/delmaro.png" alt="...">
                    </div>
                    <span class="title">Зеленая горчица</span>
                </div>
            </div>
            <div class="col-lg-5">
                    <div class="history-items">
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/6-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Осетинский пирог с капустой</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/2-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Чудо-трюфели</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/4-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-2 summary">
                    <div class="total">
                        <span>итого:</span>
                        <b>4500 <i class="rouble">o</i></b>
                    </div>

                    <div class="bonus">
                        <span><i class="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
                    </div>
                </div>

                <div class="col-lg-3 actions">
                    <span class="title">поделится:</span>
                    <div class="social-share">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-vk"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                    </div>
                    <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                        <span>Повторить заказ</span>
                    </a>
                </div>
            </div>

            <div class="history-item row">
                <div class="col-lg-2">
                    <div class="box-company medium">
                        <div class="thumb-round">
                            <img src="images/logos/delmaro.png" alt="...">
                        </div>
                        <span class="title">Зеленая горчица</span>
                    </div>
                </div>
                <div class="col-lg-5">
                        <div class="history-items">
                            <div class="item">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="thumb-tiny">
                                            <img src="images/samples/9-tiny.jpg">
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="text">
                                            <b>Осетинский пирог с капустой</b>
                                            <span class="price">100 <i class="rouble">o</i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="thumb-tiny">
                                            <img src="images/samples/8-tiny.jpg">
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="text">
                                            <b>Чудо-трюфели</b>
                                            <span class="price">100 <i class="rouble">o</i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="thumb-tiny">
                                            <img src="images/samples/6-tiny.jpg">
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="text">
                                            <b>Чудо-трюфели</b>
                                            <span class="price">100 <i class="rouble">o</i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="thumb-tiny">
                                            <img src="images/samples/4-tiny.jpg">
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="text">
                                            <b>Чудо-трюфели</b>
                                            <span class="price">100 <i class="rouble">o</i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="thumb-tiny">
                                            <img src="images/samples/2-tiny.jpg">
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="text">
                                            <b>Чудо-трюфели</b>
                                            <span class="price">100 <i class="rouble">o</i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="thumb-tiny">
                                            <img src="images/samples/6-tiny.jpg">
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="text">
                                            <b>Пицца из мяса</b>
                                            <span class="price">100 <i class="rouble">o</i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 summary">
                        <div class="total">
                            <span>итого:</span>
                            <b>4500 <i class="rouble">o</i></b>
                        </div>

                        <div class="bonus">
                            <span><i class="fa fa-rub"></i>-бонусов</span>
                            <b>+ 400</b>
                        </div>
                    </div>

                    <div class="col-lg-3 actions">
                        <span class="title">поделится:</span>
                        <div class="social-share">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-vk"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                        </div>
                        <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                            <span>Повторить заказ</span>
                        </a>
                    </div>

                </div>


            </div>
    </section>
    <section class="the-tab the-history" id="tab-reservation-history">
        <div class="container">
            <div class="history-item row">
                <div class="col-lg-2">
                    <div class="box-company medium">
                        <div class="thumb-round">
                            <img src="images/logos/delmaro.png" alt="...">
                        </div>
                        <span class="title">Зеленая горчица</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="history-items">
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny table-number">
                                        <span><i class="icon-anchor"></i></span>
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Стол №1</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/3-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Чудо-трюфели</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/2-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 summary">
                    <div class="total">
                        <span>итого:</span>
                        <b>4500 <i class="rouble">o</i></b>
                    </div>
                    <div class="bonus">
                        <span><i class="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
                    </div>
                </div>
                <div class="col-lg-3 actions">
                    <span class="title">поделится:</span>
                    <div class="social-share">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-vk"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                    </div>
                    <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                        <span>Повторить заказ</span>
                    </a>
                </div>
            </div> <!-- history-item -->

       <div class="history-item row">
                <div class="col-lg-2">
                    <div class="box-company medium">
                        <div class="thumb-round">
                            <img src="images/logos/delmaro.png" alt="...">
                        </div>
                        <span class="title">Зеленая горчица</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="history-items">
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny table-number">
                                        <span><i class="icon-anchor"></i></span>
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Стол №1</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/3-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Чудо-трюфели</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/2-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 summary">
                    <div class="total">
                        <span>итого:</span>
                        <b>4500 <i class="rouble">o</i></b>
                    </div>
                    <div class="bonus">
                        <span><i class="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
                    </div>
                </div>
                <div class="col-lg-3 actions">
                    <span class="title">поделится:</span>
                    <div class="social-share">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-vk"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                    </div>
                    <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                        <span>Повторить заказ</span>
                    </a>
                </div>
            </div> <!-- history-item -->

       <div class="history-item row">
                <div class="col-lg-2">
                    <div class="box-company medium">
                        <div class="thumb-round">
                            <img src="images/logos/delmaro.png" alt="...">
                        </div>
                        <span class="title">Зеленая горчица</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="history-items">
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny table-number">
                                        <span><i class="icon-anchor"></i></span>
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Стол №1</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/3-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Чудо-трюфели</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/2-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 summary">
                    <div class="total">
                        <span>итого:</span>
                        <b>4500 <i class="rouble">o</i></b>
                    </div>
                    <div class="bonus">
                        <span><i class="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
                    </div>
                </div>
                <div class="col-lg-3 actions">
                    <span class="title">поделится:</span>
                    <div class="social-share">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-vk"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                    </div>
                    <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                        <span>Повторить заказ</span>
                    </a>
                </div>
            </div> <!-- history-item -->

       <div class="history-item row">
                <div class="col-lg-2">
                    <div class="box-company medium">
                        <div class="thumb-round">
                            <img src="images/logos/delmaro.png" alt="...">
                        </div>
                        <span class="title">Зеленая горчица</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="history-items">
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny table-number">
                                        <span><i class="icon-anchor"></i></span>
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Стол №1</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/3-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Чудо-трюфели</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/2-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 summary">
                    <div class="total">
                        <span>итого:</span>
                        <b>4500 <i class="rouble">o</i></b>
                    </div>
                    <div class="bonus">
                        <span><i class="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
                    </div>
                </div>
                <div class="col-lg-3 actions">
                    <span class="title">поделится:</span>
                    <div class="social-share">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-vk"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                    </div>
                    <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                        <span>Повторить заказ</span>
                    </a>
                </div>
            </div> <!-- history-item -->

       <div class="history-item row">
                <div class="col-lg-2">
                    <div class="box-company medium">
                        <div class="thumb-round">
                            <img src="images/logos/delmaro.png" alt="...">
                        </div>
                        <span class="title">Зеленая горчица</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="history-items">
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny table-number">
                                        <span><i class="icon-anchor"></i></span>
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Стол №1</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/3-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Чудо-трюфели</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-3 no-padding-right align-right">
                                    <div class="thumb-tiny">
                                        <img src="images/samples/2-tiny.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="text">
                                        <b>Пицца из мяса</b>
                                        <span class="price">100 <i class="rouble">o</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 summary">
                    <div class="total">
                        <span>итого:</span>
                        <b>4500 <i class="rouble">o</i></b>
                    </div>
                    <div class="bonus">
                        <span><i class="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
                    </div>
                </div>
                <div class="col-lg-3 actions">
                    <span class="title">поделится:</span>
                    <div class="social-share">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-vk"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-odnoklassniki"></i></a>
                    </div>
                    <a href="#" class="button light round button-history-repeat" id="button-history-repeat">
                        <span>Повторить заказ</span>
                    </a>
                </div>
            </div> <!-- history-item -->
        </div> <!-- container -->
    </section>`;
    $('#editUserProfile').append(htmlTemplate);
}

getUserProfile(userToken, function(data){
    console.log('wee-haa!!');
    console.log(data);
    createProfileEditor(data);
});

jQuery(document).ready(function($) {

});
