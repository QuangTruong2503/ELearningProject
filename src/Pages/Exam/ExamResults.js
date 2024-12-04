import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchGetQuestionsAndAnswerBySubmission } from '../../API/submissionsAPI';
import { fetchVerifyLogin } from '../../Helpers/VerifyLogin';
import QuestionsAndAnswer from '../../Component/Exam/QuestionsAndAnswer.tsx';

function ExamResults() {
  const {submissionID} = useParams();
    const [questionsData, setQuestionsData] = useState();

    useEffect(() =>{
      const handleGetData = async (submissionID, userID) => {
        const questionResults = await fetchGetQuestionsAndAnswerBySubmission(submissionID, userID)
        if (questionResults !== null) {
          console.log(questionResults)
          if(!questionResults.success)
          {
            setQuestionsData(undefined)
            return
          }
          setQuestionsData(questionResults);
        }
      };
      const handleVerifyLogin = async () => {
        const data = await fetchVerifyLogin();
        if (data !== undefined) {
          const userID = data.userID;
          handleGetData(submissionID, userID);
        }
      };
      handleVerifyLogin();
     
    },[submissionID]);
    
  return (
    <div className='d-flex align-items-center justify-content-center my-5'>
      <QuestionsAndAnswer data={questionsData}/>
    </div>
  )
}

export default ExamResults