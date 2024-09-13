function ConfirmationDeleteModalBodyCustom({ extraObject, closeModal }) {
  const { callBack, content } = extraObject;

  const handeConfirm = () => {
    callBack();
    closeModal();
  };
  return (
    <>
      <p className=" text-sm mt-8 text-left leading-5 font-normal">{content}</p>

      <div className="modal-action mt-12">
        <button
          className=" text-rose-700 bg-rose-50 border border-rose-50 focus:outline-none hover:bg-rose-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 "
          onClick={() => closeModal()}
        >
          Huỷ
        </button>

        <button
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
          onClick={handeConfirm}
        >
          Xác nhận
        </button>
      </div>
    </>
  );
}

export default ConfirmationDeleteModalBodyCustom;
