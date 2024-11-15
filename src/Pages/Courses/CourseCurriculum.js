import React from 'react'

function CourseCurriculum({attended}) {
  return (
    <div className="accordion" id="accordionCurriculum">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <strong>Bài học đầu tiên</strong>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionCurriculum">
      {/* Nếu đã tham gia khóa học thì hiển thị khóa học */}
      <div className="accordion-body">
          {attended &&(
            <ol className="list-group list-group-numbered">
              <li className="list-group-item"><a className='' href='https://www.youtube.com/'>Bài học đầu tiên</a></li>
            </ol>
          )}
          {!attended && (
            <ol className="list-group list-group-numbered">
              <li className="list-group-item">Bài học đầu tiên</li>
              <li className="list-group-item">Bài học đầu tiên</li>
              <li className="list-group-item">Bài học đầu tiên</li>
              <li className="list-group-item">Bài học đầu tiên</li>
            </ol>
            )}
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <strong>Bài kiểm tra</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionCurriculum">
      <div className="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
  )
}

export default CourseCurriculum