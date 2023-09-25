import React, { useState, useEffect } from 'react';
import { Smile, Paperclip } from 'react-feather';
import { getCurrentDate } from './utils/helpers';
import Comment from './components/comment';

function App() {

  const [formData, setFormData] = useState({ content: '', name: 'Jane Doe', date: '', like: 0, dislike: 9, likeactive: false, dislikeactive: false });
  const [comment, setComment] = useState([]);
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
    const localStorageData = localStorage.getItem('commentData');

    if (localStorageData) {
      setComment(JSON.parse(localStorageData));
    }
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
      // Yeni yorumları güncelleyin, diğer state değerleri değişmez
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
        // Boşsa, kullanıcıya bir hata mesajı gösterebilirsiniz.
        alert('Textarea cannot be empty. Please enter some text.');
        return; // İşlemi durdurun ve yorumu güncelleme yapmayın.
      }
      setComment((prevComment) => {
        // Yeni yorumları güncelleyin, diğer state değerleri değişmez
        const updatedComments = [...prevComment];
        updatedComments[editCommentIndex] = updatedComment;
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
    <>
      <div className=" flex flex-col justify-center items-center  ">
        <div className="mt-[50px] mb-4 w-[420px] h-[178px] bg-white rounded-[5px] select-none">
          <div className='mx-[30px] mt-[30px] relative '>
            <form className='w-[360px] h-[72px] mb-[10px] '>
              <textarea type="text" required={true}
                className=" w-[360px] h-[72px]  focus:outline-none font-roboto   resize-none text-xs text-textcolor peer" spellCheck="false"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
              />
              <small className='absolute top-0 left-0 opacity-20 font-roboto text-xs font-semibold pointer-events-none peer-focus:opacity-0 peer-valid:opacity-0 '>
                Your text here
              </small>
            </form>
            <div className='flex justify-between items-center ' >
              <div className='flex justify-center '>
                <Paperclip className='w-[16px] h-[16px] -rotate-45 opacity-20 hover:stroke-purple hover:opacity-100 cursor-pointer' />
                <Smile className='w-[16px] h-[16px] ml-[10px] opacity-20 hover:stroke-purple hover:opacity-100 cursor-pointer' />
              </div>

              <button className='w-[108px] h-[36px] bg-purple rounded-[5px] tracking-[1.4px]  font-roboto text-[14px] text-white font-medium  drop-shadow-shadow hover:bg-hover '
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default App;
