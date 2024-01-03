import React, { useState, useEffect } from 'react';

import { getCurrentDate } from './utils/helpers';
import Comment from './components/comment';
import FormComponent from './components/form';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from './components/CardSkeleton';

function App() {

  const [formData, setFormData] = useState({ content: '', name: 'Jane Doe', date: '', like: 0, dislike: 9, likeactive: false, dislikeactive: false });
  const [comment, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const defaultCommentData = {
    content: '',
    name: 'Jane Doe',
    date: '',
    like: 0,
    dislike: 9,
    likeactive: false,
    dislikeactive: false,
  };

  useEffect(() => {
    setTimeout(() => {
      const localStorageData = localStorage.getItem('commentData');

      if (localStorageData) {
        setComment(JSON.parse(localStorageData));
        setIsLoading(false);
      }
    }, 1000);

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedDate = getCurrentDate();
    setFormData({ ...formData, [name]: value, date: formattedDate });
  };
  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };
  const handleSubmit = () => {
    if (formData.content.trim() === '') {
      alert('Textarea cannot be empty. Please enter some text.');
      return;
    }

    setComment((prevComment) => {
      const updatedComments = [...prevComment, { ...formData }];
      localStorage.setItem('commentData', JSON.stringify(updatedComments));
      return updatedComments;
    });

    setFormData({ ...defaultCommentData });
  };


  const handleDelete = (indexNo) => {
    const updatedComment = [...comment];
    updatedComment.splice(indexNo, 1);
    setComment(updatedComment);
    // Güncellenmiş diziyi localStorage'a kaydet
    localStorage.setItem('commentData', JSON.stringify(updatedComment));
  };



  const [textareaValue, setTextareaValue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [isEditingComments, setIsEditingComments] = useState(Array(comment.length).fill(false));

  const handleEditClick = (index) => {
    if (isEditing === false) {
      const newIsEditingComments = [...isEditingComments];
      newIsEditingComments[index] = !newIsEditingComments[index];
      setIsEditingComments(newIsEditingComments);

      setEditCommentIndex(index);
      setIsEditing(true);
      setTextareaValue(comment[index].content);
    }
  };

  const handleSaveClick = () => {
    if (editCommentIndex !== null) {
      const updatedComment = { ...comment[editCommentIndex], content: textareaValue };

      if (textareaValue.trim() === '') {
        alert('Textarea cannot be empty. Please enter some text.');
        return;
      }

      setComment((prevComment) => {
        const updatedComments = [...prevComment];
        updatedComments[editCommentIndex] = updatedComment;
        updateLocalStorage(updatedComments); // updateLocalStorage'ı burada çağırın
        return updatedComments;
      });

      // Düzenleme modunu kapatın
      setIsEditing(false);
    }
  };

  const updateLocalStorage = (comments) => {
    localStorage.setItem('commentData', JSON.stringify(comments));
  };



  function likef(index) {
    const updatedComments = [...comment];

    if (updatedComments[index].likeactive !== false) {
      updatedComments[index].likeactive = false;
      updatedComments[index].like -= 1;
    } else {
      updatedComments[index].likeactive = true;
      updatedComments[index].like += 1;
      if (updatedComments[index].dislikeactive !== false) {
        updatedComments[index].dislikeactive = false;
        updatedComments[index].dislike -= 1;
      }
    }
    setComment(updatedComments);
    updateLocalStorage(updatedComments);
  }
  function dislikef(index) {
    const updatedComments = [...comment];

    if (updatedComments[index].dislikeactive !== false) {
      updatedComments[index].dislikeactive = false;
      updatedComments[index].dislike -= 1;
    } else {
      updatedComments[index].dislikeactive = true;
      updatedComments[index].dislike += 1;
      if (updatedComments[index].likeactive) {
        updatedComments[index].likeactive = false;

        updatedComments[index].like -= 1;
      }
    }
    setComment(updatedComments);
    updateLocalStorage(updatedComments);
  }


  return (
    <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
      <div className=" flex flex-col  items-center  ">
        <div className="mt-[50px] mb-4 w-[420px] h-[178px] bg-white rounded-[5px] select-none">
          <FormComponent formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </div>
        {isLoading && <CardSkeleton cards="1" />}

        {comment.map((comment, indexNo) => (
          <Comment
            key={indexNo}
            comment={comment}
            indexNo={indexNo}
            isEditing={isEditing}
            editCommentIndex={editCommentIndex}
            textareaValue={textareaValue}
            isEditingComments={isEditingComments}
            handleEditClick={handleEditClick}
            handleTextareaChange={handleTextareaChange}
            handleSaveClick={handleSaveClick}
            handleDelete={handleDelete}
            likef={likef}
            dislikef={dislikef}
            setIsEditingComments={setIsEditingComments}
            setIsEditing={setIsEditing}
          />
        )).reverse()
        }
      </div>
    </SkeletonTheme>

  );
}

export default App;
