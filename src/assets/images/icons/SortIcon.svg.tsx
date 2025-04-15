interface SortIconIconProperties
{
    width?: number | string;
    height?: number | string;
    size?: number | string;
    fill?: string;
}

export default function SortIcon(props: SortIconIconProperties)
{
    return (
        <svg width={props.width || "18"} height={props.height || "12"} viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12H5C5.55 12 6 11.55 6 11C6 10.45 5.55 10 5 10H1C0.45 10 0 10.45 0 11C0 11.55 0.45 12 1 12ZM0 1C0 1.55 0.45 2 1 2H17C17.55 2 18 1.55 18 1C18 0.45 17.55 0 17 0H1C0.45 0 0 0.45 0 1ZM1 7H11C11.55 7 12 6.55 12 6C12 5.45 11.55 5 11 5H1C0.45 5 0 5.45 0 6C0 6.55 0.45 7 1 7Z" fill={props.fill || "#BDC2C2"}/>
        </svg>

    );
}