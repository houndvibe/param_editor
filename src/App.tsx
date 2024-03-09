//Все одним файлом, как и просили в задании
import { useState } from "react";

type Color = string;

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Props {
  params: Param[];
  model: Model;
}

interface Product {
  [n: string]: string;
}

const ParamsEditor: React.FC<Props> = ({ params, model }) => {
  const getModel = () => {
    const obj: Product = {};
    for (const item of params) {
      const paramName = params.find((param) => param.id === item.id)!.name;
      const product = model.paramValues.find(
        (value) => value.paramId === item.id
      );
      obj[paramName] = product ? product.value : "";
    }
    return obj;
  };

  const [myModel, setMyModel] = useState(getModel());

  const handleChangeModel = (
    e: React.ChangeEvent<HTMLInputElement>,
    paramName: string
  ) => {
    setMyModel({ ...myModel, [paramName]: e.target.value });
  };

  return (
    <div>
      <div>
        {Object.entries(myModel).map(([paramName, value]) => {
          return (
            <div key={paramName}>
              <span>{paramName}</span>
              <input
                style={{ margin: "4px 10px" }}
                type="text"
                value={value}
                onChange={(e) => handleChangeModel(e, paramName)}
              />
            </div>
          );
        })}
        <button onClick={() => console.log(myModel)}>
          Вывести в консоль обновленные параметры
        </button>
      </div>
    </div>
  );
};

//Значения параметров
const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
    {
      paramId: 3,
      value: "Lacoste",
    },
    {
      paramId: 4,
      value: "France",
    },
  ] as ParamValue[],
  colors: ["red", "green"] as Color[],
};

//Набор параметров товара - можно расширяьб и добавлять новые параметры,они автоматически добавятся в едитор
const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
  {
    id: 3,
    name: "Бренд",
    type: "string",
  },
  {
    id: 4,
    name: "Страна-производитель",
    type: "string",
  },
];

const App = () => {
  return (
    <div>
      <ParamsEditor model={model} params={params} />
    </div>
  );
};

export default App;
