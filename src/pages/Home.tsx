import { useEffect, useRef } from 'react';
import { Blog } from 'src/components/Blog';
import { Contact } from 'src/components/Contact';
import { Education } from 'src/components/Education';
import { Exams } from 'src/components/Exams';
import { Footer } from 'src/components/Footer';
import { Hero } from 'src/components/Hero';
import { WorkExperience } from 'src/components/WorkExperience';
import { useAppStores } from 'src/hooks/useAppStores';
import { useConst } from 'src/hooks/useConst';
import { usePortfolio } from 'src/hooks/usePortfolio';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';

function isIntersecting(entry: IntersectionObserverEntry) {
    return entry.isIntersecting;
}

function sortIntersectionRation(a: IntersectionObserverEntry, b: IntersectionObserverEntry) {
    return a.intersectionRatio - b.intersectionRatio;
}

function getTarget(entry: IntersectionObserverEntry) {
    return entry.target;
}

function generateThreshold(step: number): number[] {
    let value = 0;
    const threshold = [value];

    while (value !== 1) {
        value += Math.max(1, step);

        threshold.push(value);
    }

    return threshold;
}

export function Home() {
    const { uiStore } = useAppStores();
    const { educationList, jobExperienceList, testsOfExamsOrTraining } = usePortfolio();
    const { setActiveIds } = uiStore;
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const educationRef = useRef<HTMLDivElement>(null);
    const workExperienceRef = useRef<HTMLDivElement>(null);
    const examRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const blogRef = useRef<HTMLDivElement>(null);
    const elementEntriesMap = useConst(() => new Map<Element, IntersectionObserverEntry>());
    const threshold = useConst(() => generateThreshold(0.01));

    function getActiveId(target: Element) {
        switch (target) {
            case heroRef.current:
                return SectionIdentifier.Home;
            case educationRef.current:
                return SectionIdentifier.Education;
            case workExperienceRef.current:
                return SectionIdentifier.WorkExperience;
            case contactRef.current:
                return SectionIdentifier.Contact;
            case blogRef.current:
                return SectionIdentifier.Blog;
            case examRef.current:
                return SectionIdentifier.Exam;
            default:
                return SectionIdentifier.Home;
        }
    }

    useEffect(() => {
        const { current } = containerRef;
        const hero = heroRef.current;
        const blog = blogRef.current;
        const education = educationRef.current;
        const workExperience = workExperienceRef.current;
        const contact = contactRef.current;
        const exam = examRef.current;
        const targets = [hero, blog, education, workExperience, contact, exam];

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const { target } = entry;

                    elementEntriesMap.set(target, entry);
                });

                const allEntries = Array.from(elementEntriesMap.values());
                const intersectingEntries = allEntries.filter(isIntersecting);
                const sortedEntries = intersectingEntries.sort(sortIntersectionRation);
                const targetEntries = sortedEntries.map(getTarget);
                const newActiveIds = targetEntries.map(getActiveId);
                const lastActiveId = newActiveIds.at(-1);
                const result = lastActiveId ? [lastActiveId] : [];

                setActiveIds(result);
            },
            {
                root: current,
                threshold
            }
        );

        targets.forEach((el: HTMLDivElement | null) => {
            if (el) {
                io.observe(el);
            }
        });

        return () => {
            io.disconnect();
        };
    }, [elementEntriesMap, setActiveIds, threshold]);

    return (
        <>
            <Hero ref={heroRef} />
            {jobExperienceList.length > 0 && <WorkExperience ref={workExperienceRef} />}
            {educationList.length > 0 && <Education ref={educationRef} />}
            {testsOfExamsOrTraining.length > 0 && <Exams ref={examRef} />}
            <Blog ref={blogRef} />
            <Contact ref={contactRef} />
            <Footer />
        </>
    );
}
