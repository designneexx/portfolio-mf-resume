import { FC, SVGProps } from 'react';
import { FileText } from 'react-feather';
import Blog from 'src/assets/svg/blog.svg';
import Contact from 'src/assets/svg/comment.svg';
import Education from 'src/assets/svg/education.svg';
import WorkExperience from 'src/assets/svg/experience.svg';
import Home from 'src/assets/svg/home.svg';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';

export const ICONS_MAP: Record<SectionIdentifier, FC<SVGProps<SVGSVGElement>>> = {
    [SectionIdentifier.Blog]: Blog,
    [SectionIdentifier.Contact]: Contact,
    [SectionIdentifier.Education]: Education,
    [SectionIdentifier.Exam]: FileText,
    [SectionIdentifier.Hero]: Home,
    [SectionIdentifier.WorkExperience]: WorkExperience
};

export const SECTION_IDENTIFIERS: SectionIdentifier[] = [
    SectionIdentifier.Hero,
    SectionIdentifier.WorkExperience,
    SectionIdentifier.Education,
    SectionIdentifier.Exam,
    SectionIdentifier.Contact
];

export const SECTION_NAMES: Record<SectionIdentifier, string> = {
    [SectionIdentifier.Blog]: 'Блог',
    [SectionIdentifier.Contact]: 'Контакты',
    [SectionIdentifier.Education]: 'Образование',
    [SectionIdentifier.Exam]: 'Тесты, экзамены',
    [SectionIdentifier.Hero]: 'Обо мне',
    [SectionIdentifier.WorkExperience]: 'Опыт работы'
};
