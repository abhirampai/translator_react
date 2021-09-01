import { useEffect } from "react";

const Modal = ({ result, showModal }) => {
  const modalClose = () => {
    const modal = document.querySelector(".main-modal");
    modal.classList.remove("fadeIn");
    modal.classList.add("fadeOut");
    setTimeout(() => {
      modal.style.display = "none";
    }, 500);
    showModal = false;
  };
  useEffect(() => {
    if (showModal === true) {
      const modal = document.querySelector(".main-modal");
      modal.classList.remove("fadeOut");
      modal.classList.add("fadeIn");
      modal.style.display = "flex";
    }
  }, [showModal]);
  if (!showModal) return <div className="hidden"></div>;
  return (
    <>
      <div
        className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
        style={{ background: "rgba(0,0,0,.7)" }}
      >
        <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Result</p>
              <div
                onClick={modalClose}
                className="modal-close cursor-pointer z-50"
              >
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>
            <div className="my-5">
              <p>{result}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={modalClose}
                className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
