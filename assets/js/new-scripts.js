let isBonus;
let hasDefaultCard;
let index;
let defaultCard;
let jsonItems;
let jsonClient;
const MAX_K_PRICE = 1.5;
let pressEnter = false;

let minPrice = [];

$(document).ready(function () {
    /**
     * GET ADDED PRODUCTS
     */
    let totalPrice = 0.00;
    let totalDiscount = 0.00;
    let totalBonus = 0.00;
    let bonusPercent = 0;
    let row;
    let imgUrl;
    let id_product;
    let name;
    let code;
    let code_in_cart;
    let price;
    let quantity;
    let itemPhoto;
    let item;
    let count;
    let priceWithoutDiscount;
    let discount;
    let priceWithDiscount;
    let totalPriceContainer;
    let bonus;
    let deleteBtn;
    let _priceWithDiscount = 0.00;
    let _totalPrice = 0;
    let selectCards = '';
    let selectDiscount = '';
    let promokod;
    let btnBuy;
    let cardDiscount;
    let cardOption;
    let total = 0;


    $.ajax({
        type: "GET",
        url: "assets/data/data.json",
        dataType: "json",
        data: {
            id_product: "id_product",
            title: "title",
            price: "price",
            img_url: "img_url",
            href: "href",
            code_in_cart: "code_in_cart",
            min_price: "min_price",
            quantity: "quantity",
            client: "client",
            bonuses: "bonuses",
            cards: "cards",
            discount: "discount",
            size_bonuses: "size_bonuses",
            has_default_card: "has_default_card",
            percent: "percent",
            is_default_card: "is_default_card"
        },
        success: function (data) {

            jsonItems = data.data.items;
            jsonClient = data.data.client;

            isBonus = jsonClient.bonuses;

            let colspan = 6;
            if (!isBonus) colspan = 7;

            let tableContainer = $('.bx_ordercart_order_table_container');

            let bonusContainer = '';
            if (isBonus) bonusContainer = '<td class="bonuses">Бонусы</td>';

            let table = $('<table class="available"><thead><tr><td class="margin"></td><td class="item" colspan="2">Товары</td><td class="quantity">Количество</td><td class="price">Цена<br/>без скидки</td><td class="price">Скидка</td><td class="price">Цена<br/>со скидкой</td><td class="price">Стоимость<br/>со скидкой</td>' + bonusContainer + '<td class="custom"></td><td class="margin"></td></tr></thead><tbody id="lines-wrap"><tr id="tr-i-" class="tr-wrapper"><td class="margin"></td></tr></tbody><tfoot></tfoot></table>');

            tableContainer.append(table);

            let tbody = $('.available tbody');

            for (let j = 0; j < jsonClient.cards.length; j++) {
                if (jsonClient.cards[j].is_default_card) {
                    defaultCard = j;
                }
            }

            for (let i = 0; i < data.data.items.length; i++) {

                row = $('<tr />');

                imgUrl = jsonItems[i].img_url;
                id_product = parseInt(jsonItems[i].id_product);
                name = jsonItems[i].name;
                code = jsonItems[i].code;
                code_in_cart = jsonItems[i].code_in_cart;
                price = parseFloat(jsonItems[i].price);
                quantity = parseFloat(jsonItems[i].quantity);
                hasDefaultCard = jsonClient.has_default_card;

                itemPhoto = $('<td class="margin"></td><td class="itemphoto"><div class="bx_ordercart_photo_container"><a href="/Vanna-Chugunnaya-Roca-CONTINENTAL-170x70-s-Protivoskolzyashchim-Pokrytiem-21291100R/"><div class="bx_ordercart_photo"style="background-image:url(' + imgUrl + ')"></div></a></div></td>');

                item = $('<td class="item"><h2 class="bx_ordercart_itemtitle"><a href="/Vanna-Chugunnaya-Roca-CONTINENTAL-170x70-s-Protivoskolzyashchim-Pokrytiem-21291100R/">' + name + '</a></h2><div class="code">Код: ' + code + '</div></td>');

                count = $('<td class="custom quantity"><div class="centered counter counter-wrapper"><input type="text" class="in-quantity simple" min="0" value="' + quantity + '" data-kol="0"/><div class="numbersControl"><a class="numbersControl-plus"><svg width="6" height="3"><polygon points="0,3 3,0 6,3" /></svg></a><a class="numbersControl-minus"><svg width="6" height="3"><polygon points="0,0 3,3 6,0" /></svg></a></div></div>');

                if (isBonus) {
                    priceWithoutDiscount = $('<td class="price price-wrapper noleftp"><div class="current_price"><label><input class="priceWithoutDiscount" type="text" value="' + price + '"></label></div></td>');
                } else {
                    priceWithoutDiscount = $('<td class="price price-wrapper noleftp"><div class="current_price priceWithoutDiscount">' + price + '</div></td>');
                }

                if (!isBonus && hasDefaultCard) {
                    discount = $('<td class="price price-wrapper noleftp current_price" style="line-height: 22px;"><span class="discountContainer">' + jsonClient.cards[defaultCard].discount[0].percent / 100 * price + '</span> &#8381;<br/><span class="discountPercentContainer">' + jsonClient.cards[defaultCard].discount[0].percent + '</span> %</td>');

                    _priceWithDiscount = (price - jsonClient.cards[defaultCard].discount[0].percent / 100 * price).toFixed(2);
                } else if (!isBonus && !hasDefaultCard) {
                    discount = $('<td class="price price-wrapper noleftp current_price" style="line-height: 22px;"><span class="discountContainer">0.00</span> &#8381;<br/><span class="discountPercentContainer">0</span> %</td>');

                    _priceWithDiscount = price.toFixed(2);
                } else {
                    discount = $('<td class="price price-wrapper noleftp"><label><input class="discountInput" type="text" value="0"> &#8381;</label><br/><label><input class="discountInput_percent" type="text" value="0"> %</label><br/><a class="acceptBtn discountInput_check" href="#">Применить %<br />ко всем</a></td>');

                    _priceWithDiscount = (price).toFixed(2);
                }

                _totalPrice = (parseFloat(_priceWithDiscount) * quantity).toFixed(2);
                totalPrice += parseFloat(_totalPrice);
                total += jsonItems[i].price * quantity;

                priceWithDiscount = $('<td class="custom quantity"><div class="current_price priceWithDiscountContainer">' + _priceWithDiscount + '</div></td>');

                totalPriceContainer = $('<td class="custom addSUM sum"><div class="current_price totalPriceWithDiscountContainer">' + _totalPrice + '</div></td>');

                if (isBonus) {
                    if (hasDefaultCard) {
                        bonus = $('<td class="price price-wrapper noleftp"><label><input class="bonusInput" type="text" value="' + ((price * (jsonClient.cards[defaultCard].discount[0].percent / 100)) * quantity).toFixed(2) + '"> <div class="bonusIcon">&#8381; </div></label><br/><label><input class="bonusInput_percent" type="text" value="' + jsonClient.cards[defaultCard].discount[0].percent.toFixed(2) + '"> %</label><br/><a class="acceptBtn bonusInput_check" href="#">Применить %<br />ко всем</a></td>');
                    } else {
                        bonus = $('<td class="price price-wrapper noleftp"><label><input class="bonusInput" type="text" value="0"> <div class="bonusIcon">&#8381; </div></label><br/><label><input class="bonusInput_percent" type="text" value="0"> %</label><br/><a class="acceptBtn bonusInput_check" href="#">Применить %<br />ко всем</a></td>');
                    }
                }

                deleteBtn = $('<td class="control"><a class="del"><img src="assets/img/new-delete.png" alt="delete"/></a></td><td class="margin">');

                row.append(itemPhoto);
                row.append(item);
                row.append(count);
                row.append(priceWithoutDiscount);
                row.append(discount);
                row.append(priceWithDiscount);
                row.append(totalPriceContainer);
                if (isBonus) row.append(bonus);
                row.append(deleteBtn);

                tbody.append(row);

                if (hasDefaultCard) {
                    minPrice.push(jsonItems[i].price - (jsonItems[i].price * jsonClient.cards[defaultCard].discount[0].percent / 100));
                } else {
                    minPrice.push(jsonItems[i].price);
                }
            }

            totalDiscount = total - totalPrice;

            let tfoot;
            if (isBonus) {
                tfoot = $('<tr><td class="margin"></td><td class="total__price" colspan="' + colspan + '">Итого: <span class="total__price_without__span">' + total.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.</span>&#8195;Итого со скидкой: <span class="total__price__span">' + totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.</span>&#8195;Скидка: <span class="total__price__discount__span">' + totalDiscount.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.</span></td><td class="total__bonuses" colspan="3">Бонусы: <span class="total__bonuses__span">' + totalBonus + ' руб.</span><div class="bonusIcon">&#8381;</div> <span class="total__bonuses__percent__span">(' + bonusPercent + '%)</spantotal__bonuses__span></td><td class="margin"></td></tr>');
            } else {
                tfoot = $('<tr><td class="margin"></td><td class="total__price" colspan="' + colspan + '">Итого: <span class="total__price_without__span">' + total.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.</span>&#8195;Итого со скидкой: <span class="total__price__span">' + totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.</span>&#8195;Скидка: <span class="total__price__discount__span">' + totalDiscount.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.</span></td></tr>');
            }
            $('.available tfoot').append(tfoot);

            let cardsContainer = $('.basket__cards');

            promokod = $('<div class="basket__promokod"><label for="promokod">Промокод </label><input id="promokod" type="text"></div>');

            btnBuy = $('<div class="basket__buy"><a href="/personal/make/" class="js-add-order"><span class="span-button-wrap orange" style="width: 200px;float: right"><span class="span-button"><span>Перейти к оформлению</span></span></span></a></div>');

            if (jsonClient.cards.length >= 1) {
                if (!hasDefaultCard) {
                    selectCards = $('<div class="basket__card"><label>Дисконтная карта <select id="selectCards" onmousedown="firstCard(); $(\':last-child\', this).remove(); this.onmousedown = null;"></select></label></div>');
                    selectDiscount = $('<div class="basket__cardDiscount"><label>Вид скидки<select id="selectDiscount"></select></label></div>');
                } else {
                    selectCards = $('<div class="basket__card"><label>Дисконтная карта <select id="selectCards"></select></label></div>');
                    selectDiscount = $('<div class="basket__cardDiscount"><label>Вид скидки<select id="selectDiscount"></select></label></div>');
                }
            }

            cardsContainer.append(selectCards, selectDiscount, promokod, btnBuy);

            for (let j = 0; j < jsonClient.cards.length; j++) {
                if (jsonClient.cards[j].is_default_card) {
                    cardOption = $('<option selected>' + jsonClient.cards[j].name + '</option>');
                } else {
                    cardOption = $('<option>' + jsonClient.cards[j].name + '</option>');
                }
                $('#selectCards').append(cardOption);
            }

            if (!hasDefaultCard) {
                cardOption = $('<option selected></option>');
                $('#selectCards').append(cardOption);
                cardDiscount = $('<option>0%</option>');
                $('#selectDiscount').append(cardDiscount);
            }

            if (hasDefaultCard) {
                let selectDiscount = $('#selectDiscount');
                cardDiscount = $('<option>0%</option>');
                selectDiscount.append(cardDiscount);
                for (let i = 0; i < jsonClient.cards[defaultCard].discount.length; i++) {
                    cardDiscount = $('<option>' + jsonClient.cards[defaultCard].discount[i].percent + '%</option>');
                    selectDiscount.append(cardDiscount);
                }
                $($('#selectDiscount option')[1]).prop('selected', true);
            }

            addListeners();
            changeCard();
            changeDiscount();
            addAcceptListeners();
            changeTotalBonuses();

            $('.numbersControl-plus').on('click', function (e) {
                index = $(e.target).parents('tr').index() - 1;
                let input = $('.in-quantity')[index];
                let value = parseFloat(input.value);
                value = value + 1;
                $(input).val(value).change();
                quantityBlur(index);
            });

            $('.numbersControl-minus').on('click', function (e) {
                index = $(e.target).parents('tr').index() - 1;
                let input = $('.in-quantity')[index];
                let value = parseFloat(input.value);
                value = value - 1;
                $(input).val(value).change();
                quantityBlur(index);
            });
        }
    });
});

/**
 * LISTENERS FOR ACCEPT BUTTONS
 */
let addAcceptListeners = function () {

    let discountInputPercent = $('.discountInput_percent');
    let discountInput = $('.discountInput');
    let priceWithoutDiscount = $('.priceWithoutDiscount');
    let priceWithDiscountContainer = $('.priceWithDiscountContainer');
    let bonusInput = $('.bonusInput');
    let bonusInputPercent = $('.bonusInput_percent');
    let count = $('.in-quantity');
    let bonusInput_check = $('.bonusInput_check');
    let totalPrice = $('.totalPriceWithDiscountContainer');

    let discountInput_check = $('.discountInput_check');
    discountInput_check.on('click', function (e) {
        e.preventDefault();
        index = $(e.target).parents('tr').index() - 1;

        $(discountInputPercent).val(parseFloat(discountInputPercent[index].value).toFixed(2));

        for (let i = 0; i < discountInputPercent.length; i++) {

            $(discountInput[i]).val((discountInputPercent[i].value / 100 * priceWithoutDiscount[i].value).toFixed(2));
            $(priceWithDiscountContainer[i]).text((priceWithoutDiscount[i].value - discountInput[i].value).toFixed(2));

            if (priceWithoutDiscount[i].value - discountInput[i].value < minPrice[i] && jsonItems[i].price - discountInput[i].value === minPrice[i]) {
                $(priceWithoutDiscount[i]).val(jsonItems[i].price);
                $(discountInput[i]).val((priceWithoutDiscount[i].value * discountInputPercent[i].value / 100).toFixed(2));
                $(bonusInput[i]).val(0);
                $(bonusInputPercent[i]).val(0);
                $(priceWithDiscountContainer[i]).val((priceWithoutDiscount[i].value - (priceWithoutDiscount[i].value - minPrice[i])).toFixed(2));
            } else {
                $(priceWithoutDiscount[i]).val(jsonItems[i].price);
                $(discountInput[i]).val((priceWithoutDiscount[i].value * discountInputPercent[i].value / 100).toFixed(2));
                $(bonusInput[i]).val(((priceWithoutDiscount[i].value - discountInput[i].value - minPrice[i]) * count[i].value).toFixed(2));
                $(bonusInputPercent[i]).val(((priceWithoutDiscount[i].value - discountInput[i].value - minPrice[i]) / priceWithoutDiscount[i].value * 100).toFixed(2));
            }

            $(totalPrice[i]).text(($(priceWithDiscountContainer[i]).text() * count[i].value).toFixed(2));
        }

        changeTotal();
        changeTotalDiscount();
        changeTotalBonuses();
    });

    bonusInput_check.on('click', function (e) {
        e.preventDefault();
        index = $(e.target).parents('tr').index() - 1;

        $(bonusInputPercent).val(parseFloat(bonusInputPercent[index].value).toFixed(2));

        for (let i = 0; i < discountInputPercent.length; i++) {

            if (priceWithoutDiscount[i].value - priceWithoutDiscount[i].value * bonusInputPercent[i].value / 100 <= minPrice[i]) {
                let percent = 1 - (minPrice[i] / priceWithoutDiscount[i].value);
                $(bonusInputPercent[i]).val((percent * 100).toFixed(2));
                $(discountInput[i]).val(0);
                $(discountInputPercent[i]).val(0);
                $(bonusInput[i]).val(((priceWithoutDiscount[i].value * bonusInputPercent[i].value / 100) * count[i].value).toFixed(2));
            } else {
                let onePercent = (jsonItems[i].price - minPrice[i]) / parseFloat($('#selectDiscount option:selected').val());
                $(bonusInput[i]).val((onePercent * bonusInputPercent[i].value * count[i].value).toFixed(2));
                $(discountInput[i]).val((priceWithoutDiscount[i].value - onePercent * bonusInputPercent[i].value - minPrice[i]).toFixed(2));
                $(discountInputPercent[i]).val((discountInput[i].value / priceWithoutDiscount[i].value * 100).toFixed(2));
                $(priceWithDiscountContainer[i]).text((priceWithoutDiscount[i].value - discountInput[i].value).toFixed(2));
                $(totalPrice[i]).text(($(priceWithDiscountContainer[i]).text() * count[i].value).toFixed(2));
            }

            if (bonusInputPercent.value === '') $(bonusInputPercent).val(0);
        }

        changeTotal();
        changeTotalDiscount();
        changeTotalBonuses();
    });
};
/**
 * LISTENERS
 */
let addListeners = function () {
    /**
     * ONLY NUMBS
     */
    $('.available input').on('keypress', function (e) {
        let key = e.keyCode;
        if (key === 13) return;
        key = String.fromCharCode(key);
        let regex = /[0-9]|\./;
        if (!regex.test(key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
        }
    });

    /**
     * QUANTITY LISTENERS
     */
    let quantityContainer = $('.in-quantity');
    quantityContainer.on('focus', function (e) {
        index = $(e.target).parents('tr').index() - 1;
    });

    quantityContainer.on('keypress', function (e) {
        if (e.keyCode === 13) {
            quantityBlur(index);
        }
    });

    quantityContainer.on('blur', function () {
        quantityBlur(index);
    });

    /**
     * PRICE WITHOUT DISCOUNT LISTENERS
     */
    let priceWithoutDiscountContainer = $('.priceWithoutDiscount');
    priceWithoutDiscountContainer.on('focus', function (e) {
        index = $(e.target).parents('tr').index() - 1;
    });

    priceWithoutDiscountContainer.on('keydown', function (e) {
        if (e.keyCode === 13) {
            pressEnter = true;
            priceWithoutDiscountBlur(index);
        }
    });

    priceWithoutDiscountContainer.on('blur', function (event) {
        if (!pressEnter) {
            priceWithoutDiscountBlur(index, event);
        }
    });

    /**
     * DISCOUNT LISTENERS
     */
    let discountInputContainer = $('.discountInput');
    discountInputContainer.on('focus', function (e) {
        index = $(e.target).parents('tr').index() - 1;
    });

    discountInputContainer.on('keypress', function (e) {
        if (e.keyCode === 13) {
            discountInputBlur(index);
        }
    });

    discountInputContainer.on('blur', function () {
        discountInputBlur(index);
    });

    let discountInput_percentContainer = $('.discountInput_percent');
    discountInput_percentContainer.on('focus', function (e) {
        index = $(e.target).parents('tr').index() - 1;
    });

    discountInput_percentContainer.on('keypress', function (e) {
        if (e.keyCode === 13) {
            discountInput_percentBlur(index);
        }
    });

    discountInput_percentContainer.on('blur', function () {
        discountInput_percentBlur(index);
    });

    /**
     * BONUS LISTENERS
     */
    if (isBonus) {
        let bonusInputContainer = $('.bonusInput');
        bonusInputContainer.on('focus', function (e) {
            index = $(e.target).parents('tr').index() - 1;
        });

        bonusInputContainer.on('keypress', function (e) {
            if (e.keyCode === 13) {
                bonusBlur(index);
            }
        });

        bonusInputContainer.on('blur', function () {
            bonusBlur(index);
        });

        let bonusInput_percentContainer = $('.bonusInput_percent');
        bonusInput_percentContainer.on('focus', function (e) {
            index = $(e.target).parents('tr').index() - 1;
        });

        bonusInput_percentContainer.on('keypress', function (e) {
            if (e.keyCode === 13) {
                bonus_percentBlur(index);
            }
        });

        bonusInput_percentContainer.on('blur', function () {
            bonus_percentBlur(index);
        });
    }
};

let quantityBlur = function (index) {
    let totalPriceWithDiscountContainer = $('.totalPriceWithDiscountContainer')[index];
    let priceWithDiscountContainer = $('.priceWithDiscountContainer')[index];
    let priceWithoutDiscount = $('.priceWithoutDiscount')[index];
    let countContainer = $('.in-quantity')[index];
    let discountInput = $('.discountInput')[index];
    let valCount = (countContainer.value);
    let bonusInput = $('.bonusInput')[index];
    let bonusInputPercent = $('.bonusInput_percent')[index];
    if (valCount === '') {
        valCount = 0;
        countContainer.value = 0;
    }
    let valPriceWithDiscount = $(priceWithDiscountContainer).text();
    let priceWithDiscount = valCount * valPriceWithDiscount;
    $(totalPriceWithDiscountContainer).text(priceWithDiscount.toFixed(2));
    if (isBonus) {
        $(bonusInput).val(((priceWithoutDiscount.value - minPrice[index] - discountInput.value) * countContainer.value).toFixed(2));
        $(bonusInputPercent).val((bonusInput.value / countContainer.value / priceWithoutDiscount.value * 100).toFixed(2));
    }

    changeTotal();
    changeTotalDiscount();
    changeTotalBonuses();
    changeTotalWithoutDiscount();
};

let priceWithoutDiscountBlur = function (index) {
    let bonuses = $('.bonusInput')[index];
    let bonusesPercent = $('.bonusInput_percent')[index];
    let priceWithoutDiscount = $('.priceWithoutDiscount')[index];
    let discountInput = $('.discountInput')[index];
    let priceWithDiscountContainer = $('.priceWithDiscountContainer')[index];
    let discountInputPercent = $('.discountInput_percent')[index];
    let countContainer = $('.in-quantity')[index];
    let totalPriceWithDiscountContainer = $('.totalPriceWithDiscountContainer')[index];
    let innerPrice = priceWithoutDiscount.value;

    if (priceWithoutDiscount.value < minPrice[index]) {
        fancyPrice('Цена не может быть ниже ', minPrice[index]);
    }

    if (priceWithoutDiscount.value <= minPrice[index]) {
        innerPrice = jsonItems[index].price - (jsonItems[index].price * parseFloat($('#selectDiscount option:selected').val()) / 100);
        $(priceWithoutDiscount).val(innerPrice);
        $(bonuses).val(0);
        $(discountInput).val(0);
    } else if (priceWithoutDiscount.value > (jsonItems[index].price * MAX_K_PRICE)) {
        fancyPrice('Цена не может быть выше ', jsonItems[index].price * MAX_K_PRICE);
        innerPrice = (jsonItems[index].price * MAX_K_PRICE);
        $(priceWithoutDiscount).val(innerPrice);
        $(bonuses).val(((priceWithoutDiscount.value - discountInput.value - minPrice[index]) * countContainer.value).toFixed(2));
    } else {
        if (priceWithoutDiscount.value - discountInput.value > minPrice[index]) {
            $(bonuses).val(((priceWithoutDiscount.value - discountInput.value - minPrice[index]) * countContainer.value).toFixed(2));
        } else if (priceWithoutDiscount.value - discountInput.value > minPrice[index]) {
            $(bonuses).val(0);
        } else if (priceWithoutDiscount.value - discountInput.value < minPrice[index]) {
            $(bonuses).val(0);
            $(discountInput).val(priceWithoutDiscount.value - minPrice[index]);
        }
        pressEnter = false;
    }

    if (isBonus) {
        $(bonusesPercent).val((((bonuses.value / countContainer.value) / priceWithoutDiscount.value) * 100).toFixed(2));
    }

    $(discountInputPercent).val(((discountInput.value / priceWithoutDiscount.value) * 100).toFixed(2));

    $(priceWithDiscountContainer).text((innerPrice - parseFloat(discountInput.value)).toFixed(2));
    $(totalPriceWithDiscountContainer).text(($(priceWithDiscountContainer).text() * countContainer.value).toFixed(2));

    changeTotal();
    changeTotalDiscount();
    changeTotalBonuses();
    changeTotalWithoutDiscount();
};

let discountInputBlur = function (index) {
    let discountInput = $('.discountInput')[index];
    let discountInputPercent = $('.discountInput_percent')[index];
    let priceWithDiscountContainer = $('.priceWithDiscountContainer')[index];
    let priceWithoutDiscount = $('.priceWithoutDiscount')[index];
    let totalPrice = $('.totalPriceWithDiscountContainer')[index];
    let count = $('.in-quantity')[index];
    let bonusInput = $('.bonusInput')[index];
    let bonusInputPercent = $('.bonusInput_percent')[index];

    if (priceWithoutDiscount.value - discountInput.value <= minPrice[index]) {
        $(discountInput).val(priceWithoutDiscount.value - minPrice[index]);
        if (isBonus) {
            $(bonusInput).val(0);
            $(bonusInputPercent).val(0);
        }
        $(priceWithDiscountContainer).val(priceWithoutDiscount.value - (priceWithoutDiscount.value - minPrice));
    } else {
        if (isBonus) {
            $(bonusInput).val(((priceWithoutDiscount.value - minPrice[index] - discountInput.value) * count.value).toFixed(2));
            $(bonusInputPercent).val(((bonusInput.value / count.value / priceWithoutDiscount.value) * 100).toFixed(2));
        }
    }

    let valPriceWithDiscount = priceWithoutDiscount.value - discountInput.value;

    $(priceWithDiscountContainer).text(valPriceWithDiscount.toFixed(2));
    $(totalPrice).text((valPriceWithDiscount * count.value).toFixed(2));

    $(discountInputPercent).val((100 - (100 / (priceWithoutDiscount.value / valPriceWithDiscount))).toFixed(2));

    changeTotal();
    changeTotalDiscount();
    changeTotalBonuses();
    changeTotalWithoutDiscount();
};

let discountInput_percentBlur = function (index) {
    let bonusInput = $('.bonusInput')[index];
    let bonusInputPercent = $('.bonusInput_percent')[index];
    let discountInput = $('.discountInput')[index];
    let discountInputPercent = $('.discountInput_percent')[index];
    let priceWithDiscountContainer = $('.priceWithDiscountContainer')[index];
    let priceWithoutDiscount = $('.priceWithoutDiscount')[index];
    let totalPriceWithDiscountContainer = $('.totalPriceWithDiscountContainer')[index];
    let count = $('.in-quantity')[index];

    if (priceWithoutDiscount.value - discountInputPercent.value / 100 * priceWithoutDiscount.value <= minPrice[index]) {
        let percent = 1 - (minPrice[index] / priceWithoutDiscount.value);
        $(discountInputPercent).val((percent * 100).toFixed(2));
        $(discountInput).val((percent * priceWithoutDiscount.value).toFixed(2));
    } else if (discountInputPercent.value <= 0) {
        $(discountInputPercent).val(0);
        $(discountInput).val(0);
    } else {
        $(discountInput).val((priceWithoutDiscount.value * (discountInputPercent.value / 100)).toFixed(2));
    }

    if (isBonus) {
        $(bonusInput).val(((priceWithoutDiscount.value - minPrice[index] - discountInput.value) * count.value).toFixed(2));
        $(bonusInputPercent).val(((bonusInput.value / count.value / priceWithoutDiscount.value) * 100).toFixed(2));
    }

    $(priceWithDiscountContainer).text((priceWithoutDiscount.value - discountInput.value).toFixed(2));
    $(totalPriceWithDiscountContainer).text(($(priceWithDiscountContainer).text() * count.value).toFixed(2));

    changeTotal();
    changeTotalDiscount();
    changeTotalBonuses();
    changeTotalWithoutDiscount();
};

let bonusBlur = function (index) {
    let discountInput = $('.discountInput')[index];
    let discountInputPercent = $('.discountInput_percent')[index];
    let priceWithoutDiscount = $('.priceWithoutDiscount')[index];
    let count = $('.in-quantity')[index];
    let bonusInput = $('.bonusInput')[index];
    let bonusInputPercent = $('.bonusInput_percent')[index];

    if (priceWithoutDiscount.value - bonusInput.value / count.value <= minPrice[index]) {
        $(discountInput).val(0);
        $(discountInputPercent).val(0);
        $(bonusInput).val(((priceWithoutDiscount.value - minPrice[index]) * count.value).toFixed(2));
    } else {
        $(discountInput).val((priceWithoutDiscount.value - (minPrice[index] + bonusInput.value / count.value)).toFixed(2));
    }

    $(discountInputPercent).val((100 - (100 / (priceWithoutDiscount.value / (priceWithoutDiscount.value - discountInput.value)))).toFixed(2));
    $(bonusInputPercent).val(((bonusInput.value / count.value) / priceWithoutDiscount.value * 100).toFixed(2));

    changeTotal();
    changeTotalDiscount();
    changeTotalBonuses();
    changeTotalWithoutDiscount();
};

let bonus_percentBlur = function () {
    let discountInput = $('.discountInput')[index];
    let discountInputPercent = $('.discountInput_percent')[index];
    let priceWithDiscountContainer = $('.priceWithDiscountContainer')[index];
    let priceWithoutDiscount = $('.priceWithoutDiscount')[index];
    let totalPrice = $('.totalPriceWithDiscountContainer')[index];
    let count = $('.in-quantity')[index];
    let bonusInput = $('.bonusInput')[index];
    let bonusInputPercent = $('.bonusInput_percent')[index];
    let onePercent = (jsonItems[index].price - minPrice[index]) / parseFloat($('#selectDiscount option:selected').val());

    if (priceWithoutDiscount.value - priceWithoutDiscount.value * bonusInputPercent.value / 100 <= minPrice[index]) {
        let percent = 1 - (minPrice[index] / priceWithoutDiscount.value);
        $(bonusInputPercent).val((percent * 100).toFixed(2));
        $(discountInput).val(0);
        $(discountInputPercent).val(0);
        $(bonusInput).val(((priceWithoutDiscount.value * bonusInputPercent.value / 100) * count.value).toFixed(2));
    } else {
        $(bonusInput).val((onePercent * bonusInputPercent.value * count.value).toFixed(2));
        $(discountInput).val((priceWithoutDiscount.value - onePercent * bonusInputPercent.value - minPrice[index]).toFixed(2));
        $(discountInputPercent).val((discountInput.value / priceWithoutDiscount.value * 100).toFixed(2));
        $(priceWithDiscountContainer).text((priceWithoutDiscount.value - discountInput.value).toFixed(2));
        $(totalPrice).text(($(priceWithDiscountContainer).text() * count.value).toFixed(2));
    }

    if (bonusInputPercent.value === '') $(bonusInputPercent).val(0);

    changeTotal();
    changeTotalDiscount();
    changeTotalBonuses();
    changeTotalWithoutDiscount();
};
/**
 * FANCYBOX PRICE
 */
let fancyPrice = function (text, price) {
    $.fancybox.open($('.basket__modal'), {
        trapFocus: true,
        autoFocus: false,
        touch: false,
        beforeShow: function () {
            $('html').addClass('scroll-disable');
            $('.basket__modal').text(text + parseInt(price).toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.')
        },
        afterClose: function () {
            $('html').removeClass('scroll-disable');
            pressEnter = false;
        }
    });
};

/**
 * CHANGE TOTAL
 */
let changeTotal = function () {
    let totalPrice = 0;
    let totalPriceWithDiscountContainer = $('.totalPriceWithDiscountContainer');
    for (let i = 0; i < totalPriceWithDiscountContainer.length; i++) {
        totalPrice += parseFloat($(totalPriceWithDiscountContainer[i]).text());
    }
    $('.total__price__span').text(totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.');
};

let changeTotalDiscount = function () {
    let totalDiscount = 0;
    let count = $('.in-quantity');
    let price = $('.priceWithoutDiscount');
    let priceWithDiscount = $('.priceWithDiscountContainer');
    for (let i = 0; i < priceWithDiscount.length; i++) {
        if (isBonus) {
            totalDiscount += ((parseFloat(price[i].value) - parseFloat($(priceWithDiscount[i]).text())) * parseFloat(count[i].value));
        } else {
            totalDiscount += ((parseFloat($(price[i]).text()) - parseFloat($(priceWithDiscount[i]).text())) * parseFloat(count[i].value));
        }
    }

    $('.total__price__discount__span').text(totalDiscount.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.');
};

let changeTotalBonuses = function () {
    let totalBonuses = 0;
    let totalSum = 0;
    let priceWithoutDiscount = $('.priceWithoutDiscount');
    let count = $('.in-quantity');
    let bonuses = $('.bonusInput');
    for (let i = 0; i < bonuses.length; i++) {
        totalBonuses += parseFloat(bonuses[i].value);
    }
    $('.total__bonuses__span').text(totalBonuses.toLocaleString(undefined, {minimumFractionDigits: 2}));

    for (let i = 0; i < priceWithoutDiscount.length; i++) {
        totalSum += priceWithoutDiscount[i].value * count[i].value;
    }

    $('.total__bonuses__percent__span').text((totalBonuses / (totalSum) * 100).toFixed(2) + '%');
};

let changeTotalWithoutDiscount = function () {
    let count = $('.in-quantity');
    let priceWithoutDiscount = $('.priceWithoutDiscount');
    let totalPriceWithoutSpan = $('.total__price_without__span');
    let totalWithout = 0;

    for (let i = 0; i < priceWithoutDiscount.length; i++) {
        totalWithout += priceWithoutDiscount[i].value * count[i].value;
    }

    $(totalPriceWithoutSpan).text(totalWithout.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.');
};

/**
 * SELECT LISTENERS
 */
let changeCard = function () {
    $('#selectCards').on('change', function () {
        let selectedDiscount = $('#selectDiscount');
        let index = $('#selectCards')[0].selectedIndex;
        $('#selectDiscount option').remove();
        let option = $('<option selected>0%</option>');
        selectedDiscount.append(option);
        for (let i = 0; i < jsonClient.cards[index].discount.length; i++) {
            option = $('<option>' + jsonClient.cards[index].discount[i].percent + '%</option>');
            selectedDiscount.append(option);
        }
    });
};

let changeDiscount = function () {
    $('#selectDiscount').on('change', function () {

        let isAccept = false;

        $.fancybox.open($('#discount__modal'), {
            trapFocus: true,
            autoFocus: false,
            touch: false,
            beforeShow: function () {
                $('html').addClass('scroll-disable');

                $('#discount__modal__yes').on('click', function () {
                    isAccept = true;
                    $.fancybox.close();
                });

                $('#discount__modal__no').on('click', function () {
                    isAccept = false;
                    $.fancybox.close();
                });
            },
            afterClose: function () {
                $('html').removeClass('scroll-disable');

                if (isAccept) {
                    minPrice = [];
                    for (let i = 0; i < jsonItems.length; i++) {
                        minPrice.push(jsonItems[i].price - (jsonItems[i].price * parseFloat($('#selectDiscount option:selected').val()) / 100));
                    }

                    let selectDiscount = $('#selectDiscount');
                    let bonusInputPercent = $('.bonusInput_percent');
                    let bonusInput = $('.bonusInput');
                    let count = $('.in-quantity');
                    let priceWithoutDiscount = $('.priceWithoutDiscount');
                    let discountContainer = $('.discountContainer');
                    let priceWithDiscountContainer = $('.priceWithDiscountContainer');
                    let totalPriceWithDiscountContainer = $('.totalPriceWithDiscountContainer');

                    if (isBonus) {
                        let index = selectDiscount[0].selectedIndex;
                        let discount = parseFloat($('#selectDiscount option')[index].value);

                        $('.discountInput').val(0);
                        $('.discountInput_percent').val(0);
                        $(bonusInputPercent).val(discount.toFixed(2));
                        for (let i = 0; i < bonusInputPercent.length; i++) {
                            $(bonusInput[i]).val((bonusInputPercent[i].value / 100 * priceWithoutDiscount[i].value * count[i].value).toFixed(2));
                        }
                        changeTotalBonuses();
                        changeTotal();
                        changeTotalDiscount();
                        changeTotalWithoutDiscount();
                    } else {
                        let _totalPrice = 0;
                        let _totalWithDiscount = 0;
                        let _totalDiscount = 0;
                        let total__price__span = $('.total__price__span');
                        let total__price__discount__span = $('.total__price__discount__span');
                        let selectedOption = $('#selectDiscount option:selected').val();
                        $('.discountPercentContainer').text((parseFloat(selectedOption).toFixed(2)));
                        for (let i = 0; i < priceWithoutDiscount.length; i++) {
                            $(discountContainer[i]).text(parseFloat(selectedOption) / 100 * $(priceWithoutDiscount[i]).text());
                            $(priceWithDiscountContainer[i]).text($(priceWithoutDiscount[i]).text() - $(discountContainer[i]).text());
                            $(totalPriceWithDiscountContainer[i]).text(($(priceWithDiscountContainer[i]).text() * count[i].value).toLocaleString(undefined, {minimumFractionDigits: 2}));
                            _totalPrice += ($(priceWithoutDiscount[i]).text() * count[i].value);
                            _totalWithDiscount += parseFloat($(priceWithDiscountContainer[i]).text()) * count[i].value;
                            _totalDiscount += parseFloat($(discountContainer[i]).text()) * count[i].value;
                        }

                        $(total__price__span).text(_totalWithDiscount.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.');
                        $(total__price__discount__span).text(_totalDiscount.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' руб.');
                    }

                } else {
                    $('#selectDiscount option:first-child').prop('selected', true);
                }

                isAccept = false;
            }
        });
    });
};

let firstCard = function () {
    $('#selectDiscount option').remove();
    let selectDiscount = $('#selectDiscount');
    let option = $('<option>0%</option>');
    selectDiscount.append(option);
    for (let i = 0; i < jsonClient.cards[0].discount.length; i++) {
        option = $('<option>' + jsonClient.cards[0].discount[i].percent + '%</option>');
        selectDiscount.append(option);
    }
};
