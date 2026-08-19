export interface ISearchBarProps {
    search(input: string): Promise<void>;
    isLoading: boolean | undefined;
}