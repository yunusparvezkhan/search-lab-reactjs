import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [inputValue, setInputValue] = useState();
  const [result, setResult] = useState();

  result && console.log(result);

  useEffect(() => {
    // send req
    const getResult = async () => {
      const psudoResult = await axios.get("https://lite-toast.onrender.com/search", {
        params: {
          string: inputValue
        }
      })

      const filteredResult = psudoResult.data.camiTruck ? psudoResult.data.camiTruck : '';
      setResult(filteredResult);
    }

    const timerid = setTimeout(() => {
      if (inputValue) {
        getResult();
      }
    }, 0)


    return () => {
      clearTimeout(timerid)
    }
  }, [inputValue])

  const renderMeds = inputValue !== "" ? result && result.map((med) => {
    return (
      <div key={med.id} className="flex flex-col gap-1 items-start mt-5 pb-3 bg-gray-800 w-96" >
        <div className="flex flex-row gap-2 items-start" >
          <div className="font-bold text-blue-400" >
            Name :
          </div>
          {med.name}
        </div>
        <div className="flex flex-row gap-2 items-start">
          <div className="font-bold text-blue-400">
            Composition:
          </div>
          {med.short_composition}
        </div>
        <div className="flex flex-row gap-2 items-start">
          <div className="font-bold text-blue-400">
            Manufacturer:
          </div>
          {med.manufacturer_name}
        </div>

      </div>
    )
  })
    : result && setResult();

  return (
    <div className="App bg-gray-900 min-h-screen h-full pb-20 text-white">
      <center>
        <div className="text-4xl font-semibold pt-20 mb-5">
          Camitech Search Lab
        </div>
        <div className="flex flex-col gap-2 items-center mt-10 mb-8">
          <label className="text-xl">Search</label>
          <input onChange={(event) => setInputValue(event.target.value)} placeholder="Type your query here" className="bg-gray-700 text-white w-96 p-3" />
        </div>
        {
          inputValue !== "" ? result &&
            <div>
              <label className="text-2xl font-semibold text-green-400 underline">Results</label>
              <div className="mt-5" >
                {renderMeds}
              </div>
            </div>
            : ""
        }
      </center >
    </div >
  );

}

export default App;
