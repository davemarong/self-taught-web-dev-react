// IMPORTS
// React
import React, { useEffect } from "react";

// Material UI
import Checkbox from "@mui/material/Checkbox";

export default function TopicCheckbox({
  subject,
  projectTopics,
  setProjectTopics,
  topic,
  editableSubjects,
}) {
  console.log("topic checkbox");

  // Functions
  const getIndexOfSubject = (subject) => {
    let indexOfSubject = false;
    if (projectTopics) {
      projectTopics.map((item, id) => {
        if (item[0].title === subject) {
          indexOfSubject = id;
        }
      });
    }
    return indexOfSubject;
  };
  const getIndexOfTopic = (indexOfSubject, topic) => {
    let indexOfTopic = false;
    for (let i = 0; i < projectTopics[indexOfSubject][1].length; i++) {
      if (projectTopics[indexOfSubject][1][i].title === topic) {
        indexOfTopic = i;
        break;
      }
    }
    return indexOfTopic;
  };
  const removeTopicFromProject = (indexOfSubject, indexOfTopic) => {
    projectTopics[indexOfSubject][1].splice(indexOfTopic, 1);
  };
  const addTopicToProject = (topic, indexOfSubject) => {
    let updatedProjectTopics = projectTopics;
    const newTopic = { title: topic, learned: false, useInProject: true };
    updatedProjectTopics[indexOfSubject][1].push(newTopic);
    setProjectTopics(updatedProjectTopics);
  };
  const addTopicAndSubjectToProject = (subject, topic) => {
    let updatedProjectTopics = projectTopics;
    const newTopicAndSubject = [
      { title: subject },
      [{ title: topic, learned: false, useInProject: true }],
    ];
    updatedProjectTopics.push(newTopicAndSubject);
    setProjectTopics(updatedProjectTopics);
  };

  const updateProjectTopics = (topic, subject) => {
    const indexOfSubject = getIndexOfSubject(subject);
    if (typeof indexOfSubject != "number") {
      addTopicAndSubjectToProject(subject, topic);
      return;
    }
    const indexOfTopic = getIndexOfTopic(indexOfSubject, topic);
    if (indexOfTopic) return;
    addTopicToProject(topic, indexOfSubject);
  };
  const updateEditableProjectTopics = () => {
    setProjectTopics(editableSubjects);
  };

  const updateCheckboxValue = () => {};
  // CREATE A FUNCTION HERE THAT UPDATE AN ARRAY OF ALL TOPICS, EVERYTIME YOU CLICK ON THE CHECHBOX
  // Return
  return (
    <Checkbox
      defaultChecked={topic.useInProject}
      onChange={(event) => {
        console.log(projectTopics);
        if (event.target.checked) {
          updateProjectTopics(topic.title, subject[0].title);
        } else {
          const indexOfSubject = getIndexOfSubject(subject[0].title);
          const indexOfTopic = getIndexOfTopic(indexOfSubject, topic.title);
          removeTopicFromProject(indexOfSubject, indexOfTopic);
        }
      }}
    />
  );
}
