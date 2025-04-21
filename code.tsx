import { useState } from "react";

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  colorId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

let model : Model = {
      paramValues: [{
        paramId: 1,
        value: "повседневное"
      },
      {
        paramId: 2,
        value: "макси"
      }],
      colors: [{
        colorId: 1,
        value: 'grey',
      }]
};

let params : Param[] = [
  {
    "id": 1,
    "name": "Назначение"
  } as Param,
  {
    "id": 2,
    "name": "Длина"
  } as Param
]

let props : Props = {
  params: params as Param[],
  model: model as Model,
}

function ParamEditor(props: Props): React.ReactElement{
  const [model, setModel] = useState(props.model);

  function handlePropsChange(paramId: number, value: string){
    const tempModel: Model = {
      ...model
    };
    tempModel.paramValues.forEach(paramValue => {
      if(paramValue.paramId === paramId) paramValue.value = value;
    })
    setModel(tempModel);
    getModel();
  }

  function renderEditor(): React.ReactElement{
    const params = props.params;
    let render = params.map(param => {
      return  <div key={param.id}>
                <label>{param.name}</label>
                <input
                  type='text'
                  value={model.paramValues.find(paramValue => paramValue.paramId === param.id)?.value || ''}
                  onChange={e => handlePropsChange(param.id, e.target.value)}
                ></input>
              </div>
    })
    return(
        <>
          <div>
            {render}
          </div>
        </>
    )
  }

  function getModel() : Model{
    model.paramValues.map(paramValue => console.log(paramValue))
    return model;
  }

  return (
    <>
      <div>
          {renderEditor()}
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <ParamEditor { ...props }></ParamEditor>
    </>
  )
}
export default App
