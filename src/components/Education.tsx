import { forwardRef } from 'react';
import { usePortfolio } from 'src/hooks/usePortfolio';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';
import { v4 } from 'uuid';
import { ProfessionalCard, ProfessionalDetailItem } from './ProfessionalCard';
import { Section } from './Section';

export const Education = forwardRef<HTMLDivElement>((_props, ref) => {
    const { educationList } = usePortfolio();

    const list: ProfessionalDetailItem[] = educationList.map((item) => ({
        duration: item.educationDuration,
        id: v4(),
        secondaryTitle: item.degreeOfEducation,
        text: item.educationDepartment,
        title: item.educationalInstitution
    }));

    return (
        <Section
            className='flex flex-col items-center w-full pt-[7rem]'
            description='Этот раздел посвящен моему образовательному опыту, который предоставил мне прочную основу для моей профессиональной деятельности. Здесь я представляю информацию о полученных мной знаниях, навыках и  компетенциях, которые  я  с успехом применяю в своей работе'
            id={SectionIdentifier.Education}
            ref={ref}
            title='Образование'
        >
            <ProfessionalCard className='mt-[3.3rem]' list={list} />
        </Section>
    );
});

Education.displayName = 'Education';
