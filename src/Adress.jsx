import React from "react";
// Задание "Адрес"

const Adress = ({ adress_pull }) => {
  let adress_out = []; // массив для будущих улиц на вывод

  // функция фильтр которую мы вызовем позже чтобы вывести на экран только нужные
  function filter_to_adress(item) {
    if (
      (Number(item.house_number) % 2 == false ||
        Number(item.house_number) > 30) &&
      !(item.street.startsWith("П") || item.street.startsWith("Т"))
    ) {
      return true;
    }
  }

  // функция добавления разметки улиц на вывод
  function add_adress(item, id, disable) {
    let className = "check_wrapper";
    if (disable) {
      className += " disable";
    }
    return (
      <div key={id} className={className}>
        <h3>Квитанция номер: {Number(item.id) + 1}</h3>
        <div className="check_border">
          <p>Улица: {item.street}</p>
          <p>Номер дома: {item.house_number}</p>
          <p>Номер квартиры: {item.apartment_number}</p>
          <br />
        </div>
      </div>
    );
  }

  // Тут мы вызываем все что написали выше и выводим адреса улиц
  return (
    <div>
      <h1 className="App_header">Адрес №2</h1>
      <div className="check">
        {
          (adress_pull.map((item, id) => {
            if (filter_to_adress(item)) {
              adress_out.push(add_adress(item, id));
            } else {
              adress_out.push(add_adress(item, id, true));
            }
          }),
          adress_out)
        }
      </div>
    </div>
  );
};

export default Adress;
