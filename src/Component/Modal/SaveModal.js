import React from "react";

function SaveModal({ title, content, onSave }) {
  return (
    <div
      className="modal fade"
      id="saveModal"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="saveModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="saveModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onSave}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveModal;
