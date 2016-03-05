    function pasteCompanyDetails(company,callback){
        var output = `
            <div class="container"><div class="row">
                <div class="col-lg-2 text-center">
                    <div class="logo round" style="background-image:url(${imageBaseUrl+company.restaurant_main_image})"></div>
                    <div class="title"><h2>${company.restaurant_name}</h2><span>${company.restaurant_info}</span></div>
                </div>
                <div class="col-lg-10 the-info">
                    <div class="line types">
                        <i class="icon icn-restaurant"></i>
                        <a class="food" href="#">Европейская</a>
                        <a class="food" href="#">Японская</a>
                        <a class="food" href="#">Китайская</a>
                    </div>
                    <div class="line delivery">
                        <i class="icon icn-cab"></i>
                        <div class="box cost">
                           ' <span>стоимость</span>
                            <p>${company.restaurant_delivery_cost}</p>
                        </div>
                        <div class="box time">
                            <span>среднее время</span>
                            <p>${company.restaurant_delivery_time} минут</p>
                        </div>
                        <div class="box min">
                            <span>мин. сумма</span>
                            <p>${company.restaurant_min_order} <i class="rouble">Р.</i></p>
                        </div>
                        <div class="box min">
                            <span>средний чек</span>
                            <p>${company.restaurant_average_check} <i class="rouble">Р.</i></p>
                        </div>
                        <div class="box pay">
                            <div class="cards">
                                <div class="card-icon mastercard"><img src="images/cards/mastercard.png"></div>
                                <div class="card-icon visa"><img src="images/cards/visa.png"></div>
                            </div>
                            <span>оплата курьеру<br>оплата онлайн</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row buttons-line">
                <div class="col-lg-2">
                </div>
                <div class="col-lg-6 buttons-tabs">
                    <a class="button tab-toggle light" data-group="tabs-shop" href="#tab-comments">
                        <span>Отзывы</span>
                    </a>
                    <a class="button tab-toggle light active" data-group="tabs-shop" href="#tab-food">
                        <span>Доставка</span>
                    </a>
                    <a class="button tab-toggle light" data-grou="tabs-shop" href="#tab-reservation">
                        <span>Бронирование</span>
                    </a>
                </div>
                <div class="col-lg-4 buttons-reserv">
                    <a class="button light" href="#">
                        <i class="icon icon-eye"></i>
                        <span>3D тур</span>
                    </a>
                    <a class="button main" href="#">
                        <i class="icon icon-anchor"></i>
                        <span>Забронировать стол</span>
                    </a>
                </div>
            </div>
        </div>
        `;
        callback(output);
        return output;
    }
