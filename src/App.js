import "./App.css";
import { adress_pull } from "./data";

function App() {
  var water_cost = 205; // цена за 1 куб горячей воды в России
  var electr_cost = 3; // цена за 1 кВт электр. в России
  var adress_to_out = []; // массив для будущих улиц на вывод
  var max_water_cost = "";
  var max_water_cost_id = "";
  // функция фильтр которую мы вызовем позже чтобы вывести на экран только нужные
  function filter(item) {
    if (
      (Number(item.house_number) % 2 == false ||
        Number(item.house_number) > 30) &&
      Number(item.electricity_spent * electr_cost) < 1500 &&
      !(item.street.startsWith("П") || item.street.startsWith("Т"))
    ) {
      return true;
    }
  }

  // функция добавления разметки улиц на вывод
  function add_adress(item, id) {
    return (
      <div className="check_wrapper">
        <h3>Квитанция номер: {Number(item.id) + 1}</h3>
        <div key={id} className="check_border">
          <h3 className="check_header"></h3>
          <p>Улица: {item.street}</p>
          <p>Номер дома: {item.house_number}</p>
          <p>Номер квартиры: {item.apartment_number}</p>
          <br />
        </div>
        <div>
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
      <h1 className="App_header">Выписка по квитанциям</h1>
      <div className="check">
        {adress_pull.map((item, id) => {
          if (filter(item)) {
            adress_to_out.push(add_adress(item, id));
          }
        })}
        {/* удаление макс знач. по затратам на воду */}
        {adress_to_out.map((item, id, arr) => {
          if (
            item.props.children[2].props.children[0].props.children[6] >
            max_water_cost
          ) {
            max_water_cost =
              item.props.children[2].props.children[0].props.children[6];
            max_water_cost_id = id;
          }
          console.log(max_water_cost_id);
          console.log(arr);
        })}
        {adress_to_out.slice(0, max_water_cost_id)}
        {adress_to_out.slice(max_water_cost_id + 1, adress_to_out.length)}
      </div>
    </div>
  );
}

export default App;
