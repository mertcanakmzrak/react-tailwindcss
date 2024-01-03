import React from 'react';
import { Smile, Paperclip } from 'react-feather';

const Form = ({ formData, handleInputChange, handleSubmit }) => {
    return (
        <div className='mx-[30px] mt-[30px] relative '>
            <form className='w-[360px] h-[72px] mb-[10px] '>
                <textarea
                    type="text"
                    required={true}
                    className="w-[360px] h-[72px] focus:outline-none font-roboto resize-none text-xs text-textcolor peer"
                    spellCheck="false"
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
                <button
                    className='w-[108px] h-[36px] bg-purple rounded-[5px] tracking-[1.4px] font-roboto text-[14px] text-white font-medium drop-shadow-shadow hover:bg-hover'
                    onClick={handleSubmit}
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
};

export default Form;