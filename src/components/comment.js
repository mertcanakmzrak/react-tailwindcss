import React from 'react';
import Ellipse from '../assets/img/Ellipse 1.png';
import { ThumbsUp, ThumbsDown, Edit3, Trash2, Smile, Paperclip } from 'react-feather';

const Comment = ({
    comment, 
    indexNo, 
    isEditing, 
    editCommentIndex, 
    textareaValue, 
    isEditingComments, 
    handleEditClick,
    handleTextareaChange, 
    handleSaveClick, 
    handleDelete, 
    likef, 
    dislikef, 
    setIsEditingComments,  
    setIsEditing }) => {
    return (
        <div key={indexNo} className="mb-2 bg-white rounded-[5px] w-[420px]">
            <div className="flex  items-center m-[20px] ">
                <img className="w-[40px] h-[40px]" src={Ellipse} alt="avatar" />
                <div className="ml-[10px] relative">
                    <p className="text-datecolor text-[8px]">{comment.date }</p>

                    {editCommentIndex === indexNo && isEditingComments[indexNo] === true ? (
                        <form>
                            <div>
                                <a className="text-purple font-roboto text-[14px]" href="/"> {comment.name} </a>
                                <textarea
                                    required={true}
                                    className="w-[330px] h-[80px] focus:outline-none font-roboto resize-none text-[14px] relative leading-4 text-commentcolor peer/comment"
                                    onChange={handleTextareaChange}
                                    value={textareaValue}
                                    spellCheck={false}
                                />
                                <small className='absolute opacity-20 top-9 left-0 font-roboto text-xs font-semibold pointer-events-none peer-focus/comment:opacity-0 peer-valid/comment:opacity-0'>
                                    Your text here
                                </small>
                            </div>
                        </form>
                    ) : (
                        <form>
                            <p className='w-[330px] break-words text-[14px] font-roboto font-normal text-commentcolor '>
                                <a href="/" className='font-medium text-purple '>
                                    {comment.name}
                                </a>
                                {" " + comment.content}
                            </p>
                        </form>
                    )}
                    <div className={`flex justify-between items-center mt-5 ${isEditingComments[indexNo] ? 'block' : 'hidden'}`} >

                        <div className='flex justify-center '>
                            <Paperclip className='w-[16px] h-[16px] -rotate-45 opacity-20 hover:stroke-purple hover:opacity-100 cursor-pointer' />
                            <Smile className='w-[16px] h-[16px] ml-[10px] opacity-20 hover:stroke-purple hover:opacity-100 cursor-pointer' />
                        </div>
                        <div>
                            <button className='w-[70px] h-[23px] tracking-[1.4px]  font-roboto text-[10px] text-cancelbutton font-medium  drop-shadow-shadow  '
                                onClick={() => setIsEditingComments(Array(comment.length).fill(false), setIsEditing(false))}
                            >
                                CANCEL
                            </button>
                            <button className='w-[70px] h-[23px] bg-purple rounded-[5px] tracking-[1.4px]  font-roboto text-[10px] text-white font-medium  drop-shadow-shadow hover:bg-hover '
                                onClick={() => {
                                    handleSaveClick();
                                    setIsEditingComments(Array(comment.length).fill(false), setIsEditing(false));
                                }}
                            >
                                UPDATE
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full h-px bg-line"></div>
            <div className="flex   justify-between select-none">
                <div className="flex justify-center items-center ml-[20px] mt-[10px] mb-[12px]">
                    <ThumbsUp
                        className={`w-[15px] mr-[5px]   cursor-pointer ${comment.likeactive === true ? 'stroke-purple' : 'opacity-20'}`}
                        onClick={() => likef(indexNo)}
                    />
                    <small className='peer-hover/like:text-purple'>{comment.like}</small>
                    <ThumbsDown className={`w-[15px] ml-[20px] mr-[5px] cursor-pointer peer/dislike ${comment.dislikeactive === true ? 'stroke-textColor' : 'opacity-20'}`}
                        onClick={() => dislikef(indexNo)}
                    />
                    <small className='peer-hover/dislike:text-textcolor' >{comment.dislike}</small>
                </div>
                <div className="flex justify-center mr-[20px] mt-[10px] mb-[12px]">
                    {isEditing === true ?
                        <Edit3 className="w-[15px] mr-[10px] opacity-20 hover:stroke-purple hover:opacity-100  " />
                        :
                        <Edit3 className="w-[15px] mr-[10px] opacity-20 hover:stroke-purple hover:opacity-100 cursor-pointer " onClick={() => handleEditClick(indexNo)} />}
                    {isEditing === true ?
                        <Trash2 className="w-[15px] opacity-20 hover:stroke-textcolor hover:opacity-100" />
                        :
                        <Trash2 className="w-[15px] opacity-20 hover:stroke-textcolor hover:opacity-100 cursor-pointer" onClick={() => handleDelete(indexNo)} />}


                </div>
            </div>
        </div>
    );
};

export default Comment;
