import "./App.css";
import { adress_pull } from "./data";

function App() {
  let water_cost = 205; // цена за 1 куб горячей воды в России
  let electr_cost = 3; // цена за 1 кВт электр. в России
  let adress_out = []; // массив для будущих улиц на вывод
  let receipt_out = [];
  let max_water_cost = "";
  let max_water_cost_id = "";
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

  function filter_to_receipt(item) {
    for (let i = 0; i < item.length; i++) {
      if (item[i].electricity_spent * electr_cost > max_water_cost) {
        max_water_cost = item[i].electricity_spent * electr_cost;
        max_water_cost_id = item[i].id;
      }
    }
    return true;
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

  return (
    <div className="App">
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
}

export default App;
