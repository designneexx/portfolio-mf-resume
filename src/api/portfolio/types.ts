import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface PortfolioStructureResponse {
    aboutMe: string;
    avatarPath: string;
    citizenship: string;
    city: string;
    createdAt: string;
    educationList: EducationList[];
    email: string;
    firstName: string;
    fullName: string;
    id: string;
    jobExperienceList: JobExperienceList[];
    knowledgeOfLanguageList: KnowledgeOfLanguageList[];
    mainDegreeOfQualification: string;
    patronymic: string;
    personLocation: string;
    phone: string;
    profession: string;
    projectExperienceList: ProjectExperienceList[];
    resumeUrl: string;
    skillList: SkillList[];
    surname: string;
    testsOfExamsOrTraining: AdvancedTraining[];
    userId: string;
}

export interface Duration {
    end: string;
    start: string;
}

export interface AdvancedTraining {
    description: string;
    duration: Duration;
    id: string;
    title: string;
}

export interface KnowledgeOfLanguageList {
    id: string;
    isNativeLanguage: boolean;
    language: string;
    languageDegree: string;
}

export interface JobExperienceList {
    companyLocation: string;
    companyName: string;
    id: string;
    jobDescription: string;
    jobDuration: Duration;
    jobTitle: string;
}

export interface ProjectExperienceList {
    id: string;
    projectDescription: string;
    projectName: string;
}

export interface EducationList {
    degreeOfEducation: string;
    educationalInstitution: string;
    educationDepartment: string;
    educationDuration: Duration;
    educationFaculty: string;
    id: string;
}

export interface SkillList {
    id: string;
    skillDescription: string;
    skillLevel: string;
    skillName: string;
}

export interface SendMessageRequest {
    fullName: string;
    senderEmail: string;
    subject: string;
    text: string;
}

export interface PortfolioApi {
    getResume(
        resumeId: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<PortfolioStructureResponse>>;
}
