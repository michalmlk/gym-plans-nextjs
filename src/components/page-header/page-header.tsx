import './page-header.css';

type PageHeaderProps = {
    title: string;
    classNames?: string;
};

export default function PageHeader({
    title,
    classNames,
}: PageHeaderProps): React.ReactElement {
    return (
        <header className={`flex justify-between w-full my-10 ${classNames}`}>
            <h1 className="font-bold">{title}</h1>
        </header>
    );
}
