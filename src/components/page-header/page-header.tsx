import { PropsWithChildren, ReactNode } from 'react';
import './page-header.css';

type PageHeaderProps = {
    title: string;
    classNames?: string;
};
const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = ({
    title,
    classNames,
    children,
}): ReactNode => {
    return (
        <header
            className={`header flex justify-between items-center w-full my-10 ${classNames}`}
        >
            <h1 className="font-bold align-center">{title}</h1>

            {children}
        </header>
    );
};
export default PageHeader;
