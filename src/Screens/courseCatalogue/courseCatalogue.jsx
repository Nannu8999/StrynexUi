import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardImage,
    CCardText,
    CCardTitle,
    CCol,
    CRow,
} from '@coreui/react';
import { CButton } from '@coreui/react-pro';
import { useNavigate } from 'react-router-dom';

export default function CourseCatalogue() {

    const navigate = useNavigate();

    const cardData = [
        {
            title: 'React Course',
            image:
                'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
            text: 'Learn React from scratch and build powerful web apps.',
            updated: '3 mins ago',
        },
        {
            title: 'Advanced React',
            image:
                'https://images.pexels.com/photos/29459444/pexels-photo-29459444.jpeg?auto=compress&cs=tinysrgb&w=800',
            text: 'Take your React skills to the next level with hooks.',
            updated: '5 mins ago',
        },
        {
            title: 'React Performance',
            image:
                'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
            text: 'Optimize your React apps for performance and scalability.',
            updated: '10 mins ago',
        },
        {
            title: 'React with TypeScript',
            image:
                'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?auto=compress&cs=tinysrgb&w=800',
            text: 'Combine React with TypeScript for type-safe development.',
            updated: '20 mins ago',
        },
    ];

    return (
        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
            {cardData.map((card, index) => (
                <CCol xs key={index}>
                    <CCard>

                        <CCardImage
                            orientation="top"
                            src={card.image}
                            style={{
                                height: '200px',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        <CCardBody>
                            <CCardTitle>{card.title}</CCardTitle>
                            <CCardText>{card.text}</CCardText>
                        </CCardBody>

                        <CCardFooter>
                            <CButton color="primary" variant="outline" onClick={() => navigate('/takeCourse')}>
                                Take Course
                            </CButton>
                        </CCardFooter>

                    </CCard>
                </CCol>
            ))}
        </CRow>
    );
}
