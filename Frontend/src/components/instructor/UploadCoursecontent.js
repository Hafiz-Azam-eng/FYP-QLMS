
import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadCoursecontent } from '../../redux/actions/coursecontentActions';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from '../button/Button';




const UploadCoursecontent = ({ uploadCoursecontent }) => {
    const { courseid } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',

        file: null
    });
    const { title, description, file } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFileChange = (e) =>
        setFormData({ ...formData, file: e.target.files[0] });

    const onSubmit = (e) => {
        e.preventDefault();

        const formDataWithFile = new FormData();
        formDataWithFile.append('title', title);
        formDataWithFile.append('description', description);

        formDataWithFile.append('file', file);
        uploadCoursecontent(courseid, formDataWithFile)
            .then(() => {
                // Clear form data on successful upload
                setFormData({
                    title: '',
                    description: '',

                    file: null
                });
                // document.getElementById('formFile').value = ''; // clear file input value
            });
    };


    return (
        <>



            <div className='flex flex-col gap-8 items-center'>
                <h2 className='font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold'>Add Course Content</h2>
                <form
                    className='flex flex-col items-start gap-4'
                    onSubmit={(e) => onSubmit(e)}>
                    <div className='flex flex-col gap-4'>

                        <input
                            className='border-2 border-gray-500 p-2 justify-center outline-none'
                            type="text"
                            placeholder="Enter Title"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required
                        />
                        <textarea
                            className='border-2 border-gray-500 p-2 justify-center outline-none'
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Program Description"
                            value={description}
                            onChange={onChange}
                        />


                        <div className='flex flex-col'>
                            <p>File (ppt, pptx, doc, docx, pdf only)</p>
                            <input
                                className='border-2 border-gray-500 p-2 justify-center outline-none'
                                type="file"
                                name="file"
                                onChange={(e) => onFileChange(e)}
                                required
                            />
                        </div>
                        <button variant="primary" type="submit">
                            <Button name='Upload' />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
UploadCoursecontent.propTypes = {
    uploadCoursecontent: PropTypes.func.isRequired
};

export default connect(null, { uploadCoursecontent })(UploadCoursecontent);