import { forwardRef } from 'react';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';
import { Section } from '../Section';
import { BlogCard } from './BlogCard';

export const Blog = forwardRef<HTMLDivElement>((_props, ref) => {
    return (
        <Section
            className='hidden flex-col items-center w-full pt-[7rem]'
            description='Здесь я делюсь своими мыслями, опытом и знаниями'
            id={SectionIdentifier.Blog}
            ref={ref}
            title='Блог'
        >
            <section className='grid lg:grid-cols-3 max-lg:grid-cols-2 w-full gap-[2rem] mt-[5rem]'>
                <BlogCard
                    description='Привет, это мой первый пост'
                    imageSrc='https://img.freepik.com/free-photo/businesswoman-working-laptop-hands-typing-keyboard-top-view_1163-4667.jpg?t=st=1717200546~exp=1717204146~hmac=d1702fe0bf68f9f91e3dc363c2e174b4f67bb762d5db4dd5dcea1d1fd2130056&w=2000'
                    link='#'
                    title='Пост'
                />
            </section>
        </Section>
    );
});

Blog.displayName = 'Blog';
