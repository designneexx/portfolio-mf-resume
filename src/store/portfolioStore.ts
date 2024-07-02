import { makeAutoObservable } from 'mobx';
import { PortfolioStructureResponse } from 'src/api/portfolio/types';

export class PortfolioStore {
    isLoading: boolean = false;
    portfolio: null | PortfolioStructureResponse = null;

    setIsLoading = (value: boolean) => {
        this.isLoading = value;
    };

    setPortfolio = (value: null | PortfolioStructureResponse) => {
        this.portfolio = value;
    };

    constructor() {
        makeAutoObservable(this);
    }

    get languages() {
        return (
            this.portfolio?.knowledgeOfLanguageList.map((item) => ({
                label: item.language,
                value: 100
            })) || []
        );
    }

    get skills() {
        return (
            this.portfolio?.skillList.map((item) => ({
                label: item.skillName,
                value: Number(item.skillLevel.replace('%', ''))
            })) || []
        );
    }
}
