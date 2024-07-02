import { observer } from 'mobx-react-lite';
import { ForwardedRef, forwardRef } from 'react';
import { usePortfolio } from 'src/hooks/usePortfolio';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';
import { v4 } from 'uuid';
import { ProfessionalCard } from './ProfessionalCard';
import { Section } from './Section';

function ExamsComponent(_props: NonNullable<unknown>, ref: ForwardedRef<HTMLDivElement>) {
    const { testsOfExamsOrTraining } = usePortfolio();

    const list = testsOfExamsOrTraining.map((item) => ({
        duration: item.duration,
        id: v4(),
        text: item.description,
        title: item.title
    }));

    return (
        <Section
            className='flex flex-col items-center w-full pt-[7rem]'
            description='В этом разделе я представлю результаты своих тестов и экзаменов, которые демонстрируют мои знания и способности в различных областях. Это позволит вам получить более полное представление о моем образовательном опыте и уровне подготовки'
            id={SectionIdentifier.Exam}
            ref={ref}
            title='Тесты, экзамены'
        >
            <ProfessionalCard className='mt-[3.3rem]' list={list} />
        </Section>
    );
}

export const Exams = observer(forwardRef(ExamsComponent));
