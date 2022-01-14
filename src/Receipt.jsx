import React from "react";
// Задание "Квитанция"

const receipt = ({ adress_pull }) => {
  let max_water_cost = "";
  let max_water_cost_id = "";
  let water_cost = 205; // цена за 1 куб горячей воды в России
  let electr_cost = 3; // цена за 1 кВт электр. в России
  let receipt_out = [];

  // функция фильтр которую мы вызовем позже чтобы вывести на экран только нужные
  function filter_to_receipt(item) {
    for (let i = 0; i < item.length; i++) {
      if (item[i].electricity_spent * electr_cost > max_water_cost) {
        max_water_cost = item[i].electricity_spent * electr_cost;
        max_water_cost_id = item[i].id;
      }
    }
    return true;
  }

  // функция добавления квитанций на вывод
  function add_receipt(item, id) {
    let className = "check_wrapper";
    console.log(id);
    if (id === Number(max_water_cost_id)) {
      className += " disable";
    }
    return (
      <div key={id} className={className}>
        <h3>Квитанция номер: {Number(item.id) + 1}</h3>
        <div className="check_border">
          <p>
            Счет за воду: {item.water_cubes} * {water_cost} ={" "}
            {item.water_cubes * water_cost}
          </p>
          <p>
            Счет за электричество: {item.electricity_spent} * {electr_cost} ={" "}
            {item.electricity_spent * electr_cost}
          </p>
        </div>
        <p className="check_data">Дата выписки: {item.data}</p>
      </div>
    );
  }

  // Тут мы вызываем все что написали выше и выводим адреса улиц
  return (
    <div>
      <h1 className="receipt_header">Квитанция №1</h1>
      <div className="check">
        {
          ((filter_to_receipt(adress_pull),
          adress_pull.map((item, id) => {
            // удаление макс знач. по затратам на воду
            receipt_out.push(add_receipt(item, id));
          })),
          receipt_out)
        }
      </div>
    </div>
  );
};

export default receipt;
