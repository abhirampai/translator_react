import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const Input = () => {
  const inputEl = useRef(null);
  const targetEl = useRef(null);
  const [languages, setLanguages] = useState();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    try {
      const source = await axios.post(
        `https://libretranslate.de/detect?q=${inputEl.current.value}&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
      );
      const result = await axios.post(
        `https://libretranslate.de/translate?q=${inputEl.current.value}&source=${source.data[0].language}&target=${targetEl.current.value}&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
      );
      setResult(result.data.translatedText);
    } catch (error) {
      setResult(error.message);
    }
    setShowModal(true);
  };
  useEffect(() => {
    const pullLanguages = async () => {
      setLoading(true);
      let lang = await axios
        .get("https://libretranslate.de/languages")
        .then((resp) => {
          return resp.data;
        });
      setLanguages(lang);
      setLoading(false);
    };
    pullLanguages(); // eslint-disable-next-line
  }, []);
  if (loading) return <span>Loading...</span>;
  return (
    <div className="w-full">
      <div className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl">
        <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
          <input
            className="bg-gray-100 outline-none"
            type="text"
            ref={inputEl}
            placeholder="..."
          />
        </div>
        <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
          <select
            ref={targetEl}
            name="vehicle_id"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {languages.map((item, idx) => {
              return (
                <option key={idx} value={item.code}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div
          onClick={onSubmit}
          className="bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer"
        >
          <span>Translate</span>
        </div>
      </div>
      <Modal result={result} showModal={showModal} />
    </div>
  );
};

export default Input;
