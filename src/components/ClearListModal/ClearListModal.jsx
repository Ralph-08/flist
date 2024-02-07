import "./ClearListModal.scss";

const ClearListModal = ({ handleClearList, sendClearList }) => {
  return (
    <section className="clear">
      <section className="clear__modal">
        <h2 className="clear__message">Would you like to clear your list?</h2>
        <section className="clear__container">
          <button onClick={sendClearList} className="clear__button clear__button--primary">Yes</button>
          <button
            onClick={handleClearList}
            className="clear__button clear__button--secondary"
          >
            Cancel
          </button>
        </section>
      </section>
    </section>
  );
};

export default ClearListModal;
