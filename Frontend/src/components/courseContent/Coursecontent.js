import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchCourseContentById, downloadCoursecontent } from "../../redux/actions/coursecontentActions"
import { useParams } from 'react-router-dom'



const Coursecontentlist = ({ fetchCourseContentById, downloadCoursecontent, courseContent, loading, error }) => {
  const { contentId } = useParams();
  // console.log(contentId);
  useEffect(() => {
    fetchCourseContentById(contentId);
  }, [fetchCourseContentById, contentId])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // console.log(courseContent);
  const handleDownload = (contentId) => {
    downloadCoursecontent(contentId);
    console.log(contentId)
  };
  return (
    <div>
      {courseContent && (
        <div>
          <button onClick={() => handleDownload(courseContent._id)}>
            <div>
              {courseContent.file}</div>
          </button>
          <div>{courseContent.title}</div>
          <div>{courseContent.description}</div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  courseContent: state.courseContent.courseContent,
  loading: state.courseContent.loading,
  error: state.courseContent.error,
});

export default connect(mapStateToProps, { fetchCourseContentById,downloadCoursecontent })(Coursecontentlist);