import axios from 'axios';
import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate, useParams } from 'react-router-dom';

const Game = () => {

  const { game_id, group_id } = useParams();
  const navigate = useNavigate();  
  const [msg, setMsg] = useState();
  const [assignment, setAssignment] = useState();
  const [questionList, setQuestionList] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const { unityProvider, sendMessage } = new useUnityContext({
    loaderUrl: "/game_binaries/Build/game_binaries.loader.js",
    dataUrl: "/game_binaries/Build/game_binaries.data",
    frameworkUrl: "/game_binaries/Build/game_binaries.framework.js",
    codeUrl: "/game_binaries/Build/game_binaries.wasm",
  });

  useEffect(() => {
    getData()
  },[])

  window.setQuestions = () => {
    setTimeout(() => {
      sendMessage("Question Manager", "setQuestions", JSON.stringify(questionList));
    }, 500)
  }

  window.exitGame = () => {
    setTimeout(() => {
      navigate(`/group/${group_id}`)
    }, 500)
  }

  window.uploadScore = async (score, totalQuestions) => {
    console.log(user)
    if(user && user.role === "Alumno"){
      try {
        console.log(((score * 100) / totalQuestions))
        console.log(game_id)
        console.log(user.uuid)
        await axios.post(`${process.env.REACT_APP_API_URL}/assignments/setScore`, {
          score: ((score * 100) / totalQuestions),
          assignment_id: game_id,
          student_id: user.uuid,
        });
      } catch (error) {
        // Handle error
      }
    }
  }

  const getData = async (e) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assignments/${game_id}`);
      const questions = response.data.AssignmentQuestions
      questions.map((question) => {
        questionList.push({
          "question": question.question, 
          "answers": [question.answer1, question.answer2, question.answer3, question.answer4], 
          "correctAnswer": question.correctAnswer 
        })
      })
      setAssignment(response.data)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return(
    <>
    <div>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <Unity unityProvider={unityProvider} style={{ width: "100%", height: "85vh" }}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Game;
