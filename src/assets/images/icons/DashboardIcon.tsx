import IconProperties from "../../ts/IconProperties.ts";

export default function DashboardIcon(props: IconProperties)
{
    return (
        <svg
            width={props.size ?? props.width ?? "20"}
            height={props.size ?? props.height ?? "14"}
            viewBox="0 0 20 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7199 2.59427C18.6913 4.38422 19.8862 6.93442 19.992 9.59633C19.9973 9.73023 20 9.8648 20 10C20 11.023 19.8464 12.0105 19.5607 12.9405L19.5594 12.9447C19.513 13.0954 19.4632 13.2446 19.41 13.3922C19.2752 13.7661 18.911 14 18.5135 14H1.48645C1.08898 14 0.724845 13.7661 0.59003 13.3922C0.536323 13.2432 0.486051 13.0926 0.439312 12.9405C0.228471 12.2541 0.0895665 11.5365 0.0312506 10.7964C0.0154847 10.5963 0.00560918 10.3946 0.0017949 10.1914C0.000600053 10.1277 0 10.0639 0 10C0 4.47715 4.47715 0 10 0L10.0353 6.10338e-05C12.0473 0.0070076 13.9193 0.608161 15.4851 1.6372L15.5371 1.67164L16.4055 0.542717L17.5945 1.45728L16.7199 2.59427ZM14.62 2.86396C14.1959 2.58884 13.7457 2.3505 13.2741 2.15346C12.3202 1.75491 11.2782 1.52503 10.1833 1.50193C10.1224 1.50065 10.0613 1.5 10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 10.8721 1.63085 11.7111 1.87318 12.5H6.87731C6.80912 12.4149 6.74432 12.327 6.68314 12.2364C6.43161 11.8641 6.24112 11.4472 6.12602 11C6.04375 10.6804 6 10.3453 6 10C6 7.79086 7.79086 6 10 6C10.6702 6 11.3019 6.16482 11.8567 6.45613L14.62 2.86396ZM16.8194 4.92507C16.5145 4.51609 16.1737 4.13546 15.8017 3.78786L14.882 4.98345C14.9345 5.03449 14.9861 5.08635 15.0369 5.13901L15.0393 5.14147C16.195 6.33997 16.9288 7.95388 16.9951 9.73587C16.9983 9.82351 17 9.91156 17 9.99998C17 10.0759 16.9988 10.1515 16.9964 10.2269C16.988 10.4883 16.9654 10.7462 16.9291 11C16.8546 11.5207 16.7228 12.0229 16.5403 12.5H18.1268C18.14 12.457 18.1529 12.414 18.1654 12.3707C18.383 11.6197 18.5 10.8246 18.5 10C18.5 8.09743 17.8759 6.34196 16.8194 4.92507ZM13.1227 12.5C13.4713 12.0652 13.7309 11.556 13.874 11C14.1732 9 13.4737 7.80375 13.0866 7.45563C13.0683 7.43347 13.0498 7.41148 13.031 7.38973L13.9595 6.18268C14.3219 6.5584 14.6312 6.98556 14.8755 7.45212C15.2309 8.13082 15.4487 8.8929 15.492 9.70134C15.4973 9.80021 15.5 9.89978 15.5 9.99998C15.5 10.1017 15.4972 10.2028 15.4918 10.3032C15.4507 10.7021 15.2819 11.7 14.9344 12.5H13.1227ZM10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5C11.3807 12.5 12.4787 11.3805 12.5 10C12.5221 8.56909 11.4167 7.5 10 7.5Z"
                fill={props.fill ?? "currentColor"}
            />
        </svg>
    );
}