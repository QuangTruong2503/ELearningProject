import React from "react";

function DeleteModal({title, content, onDelete, onClose}) {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
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
              onClick={onClose}
            >
              Đóng
            </button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={onDelete}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
