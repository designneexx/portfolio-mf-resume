import { observer } from 'mobx-react-lite';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { usePortfolio } from 'src/hooks/usePortfolio';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';
import { v4 } from 'uuid';
import { ProfessionalCard, ProfessionalDetailItem } from './ProfessionalCard';
import { Section } from './Section';

function WorkExperienceComponent(_props: NonNullable<unknown>, ref: ForwardedRef<HTMLDivElement>) {
    const portfolio = usePortfolio();
    const { jobExperienceList } = portfolio;

    const list = useMemo<ProfessionalDetailItem[]>(
        () =>
            jobExperienceList.map((item) => ({
                duration: item.jobDuration,
                id: v4(),
                location: item.companyLocation,
                secondaryTitle: item.jobTitle,
                text: item.jobDescription,
                title: item.companyName
            })),
        [jobExperienceList]
    );

    console.log({ list });

    return (
        <Section
            className='flex flex-col items-center w-full pt-[7rem]'
            description='В этом разделе представлен мой профессиональный путь, демонстрирующий развитие моих ключевых навыков и достижений в различных областях'
            id={SectionIdentifier.WorkExperience}
            ref={ref}
            title='Опыт работы'
        >
            <ProfessionalCard className='mt-[3.3rem]' list={list} />
        </Section>
    );
}

export const WorkExperience = observer(forwardRef(WorkExperienceComponent));
