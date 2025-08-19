import { useState } from 'react'
import {
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CListGroup,
    CListGroupItem,
    CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

export default function TakeCourse() {

    const navigate = useNavigate()

    const videoData = [
        {
            category: 'HTML Basics',
            videos: [
                { title: 'Introduction to HTML', url: 'https://player.vimeo.com/video/76979871' },
                { title: 'HTML Elements', url: 'https://player.vimeo.com/video/357274789' },
            ],
        },
        {
            category: 'CSS Styling',
            videos: [
                { title: 'CSS Selectors', url: 'https://player.vimeo.com/video/357274707' },
                { title: 'Flexbox Guide', url: 'https://player.vimeo.com/video/65475425' },
            ],
        },
    ]

    const [selectedVideoUrl, setSelectedVideoUrl] = useState(videoData[0].videos[0].url)

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Left Panel */}

            <div
                style={{
                    width: '50%',
                    overflowY: 'auto',
                    padding: '1.5rem',
                    backgroundColor: '#f4f6f9',
                    borderRight: '1px solid #dee2e6',
                }}
            >
                <CButton color="primary" onClick={() => navigate('/courseCatalogue')} className="mb-4">
                    <CIcon icon={cilArrowLeft} className="me-2" />
                    Back
                </CButton>

                <h4 style={{ color: '#343a40', marginBottom: '1rem' }}>Course Content</h4>

                <CAccordion alwaysOpen>
                    {videoData.map((group, idx) => (
                        <CAccordionItem itemKey={idx + 1} key={group.category}>
                            <CAccordionHeader>{group.category}</CAccordionHeader>
                            <CAccordionBody style={{ backgroundColor: '#ffffff' }}>
                                <CListGroup flush>
                                    {group.videos.map((video) => (
                                        <CListGroupItem
                                            key={group.category + '-' + video.title}
                                            action
                                            onClick={() => setSelectedVideoUrl(video.url)}
                                            active={selectedVideoUrl === video.url}
                                            style={{
                                                backgroundColor: selectedVideoUrl === video.url ? '#e7f1ff' : 'transparent',
                                                color: selectedVideoUrl === video.url ? '#084298' : '#212529',
                                                fontWeight: selectedVideoUrl === video.url ? '600' : 'normal',
                                                borderRadius: '4px',
                                                marginBottom: '4px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease-in-out',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (selectedVideoUrl !== video.url) e.currentTarget.style.backgroundColor = '#f1f3f5'
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedVideoUrl !== video.url) e.currentTarget.style.backgroundColor = 'transparent'
                                            }}
                                        >
                                            {video.title}
                                        </CListGroupItem>
                                    ))}
                                </CListGroup>
                            </CAccordionBody>
                        </CAccordionItem>
                    ))}
                </CAccordion>
            </div>

            {/* Right Panel */}
            <div
                style={{
                    width: '50%',
                    height: '100vh',
                    overflowY: 'auto',
                    paddingTop: '320px',
                    position: 'relative',
                    alignItems: 'center'
                }}
            >
                {/* Fixed Video Player */}
                <div
                    style={{
                        position: 'fixed',
                        top: '10%',
                        right: 0,
                        width: '30%',
                        height: '35%',
                        zIndex: 1000,
                        overflow: 'hidden',
                        marginRight: '5%',
                        marginLeft: '10%',
                        marginTop: '2%',
                        padding: '2px',
                        border: '2%',
                        boxSizing: 'border-box',
                        borderRadius: '5%',
                        backgroundColor: 'black',
                        display: 'block',
                    }}
                >
                    <iframe
                        src={selectedVideoUrl}
                        title="Course Video"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            margin: 0,
                            padding: 0,
                            display: 'block',
                            boxSizing: 'border-box', // Same here
                        }}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>

        </div>
    )


}
