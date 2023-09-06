import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { uploadedSolution } from '../../redux/actions/submission';
import { useParams } from 'react-router-dom';
import Azam from '../img/Azam.jpg'
import { CgSoftwareDownload } from 'react-icons/cg'

const Submissions = ({ uploadedSolution, assignment, error, loading }) => {
    const { courseid, assignmentid } = useParams();

    useEffect(() => {
        uploadedSolution(courseid, assignmentid);
    }, [courseid, assignmentid]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>No Attempts found for the specified quiz.</p>;
    }



    if (!assignment) {
        return <p className='flex ml-40 font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-bold'>No Submissions found for this Assignment.</p>;
    }

    return (
        <div className='flex justify-center'>

            <div className='flex flex-col justify-center rounded-lg w-3/4'>

                {assignment.submissions && assignment.submissions.map((submission) => (
                    <div className='flex gap-8 p-4 drop-shadow-lg border mt-8 bg-gray-100' key={submission.id}>
                        <img className="w-12 h-12 rounded-full ml-2" src={Azam} alt="" />
                        <div className='flex flex-col text-start ml-4'>
                        <p className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-bold'>{submission.studentName}</p>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{submission.email}</p>
                        </div>
                        <div className='flex flex-row gap-4 ml-10'>

                        <p className='text-sm text-gray-500 dark:text-gray-400 mt-4'>{submission.file}</p>
                        <button><CgSoftwareDownload className='w-6 h-6' /></button>
                        </div>

                        <p className='ml-28'>{submission.submittedAt}</p>
                        <hr />
                    </div>
                ))}
            </div>

        </div>
    );
};

const mapStateToProps = (state) => ({
    assignment: state.submission.assignment,
});

const mapDispatchToProps = {
    uploadedSolution,
};

export default connect(mapStateToProps, mapDispatchToProps)(Submissions);
