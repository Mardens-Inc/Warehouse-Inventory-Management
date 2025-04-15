import IconProperties from "../../ts/IconProperties.ts";

export default function InventoryIcon(props: IconProperties)
{
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size ?? props.width ?? "16"}
            height={props.size ?? props.height ?? "14"}
            viewBox="0 0 16 14"
            fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.44858 3.78608C1.58368 3.55263 1.88245 3.4729 2.11589 3.608L7.62092 6.7938L13.0869 3.62762C13.3203 3.49242 13.6191 3.57203 13.7543 3.80542C13.8895 4.03881 13.8099 4.33761 13.5765 4.4728L7.86582 7.78072C7.71447 7.86839 7.5278 7.86843 7.37641 7.78082L1.62666 4.45339C1.39321 4.31829 1.31349 4.01953 1.44858 3.78608Z"
                fill={props.fill ?? "white"}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.62103 6.86324C7.89075 6.86324 8.1094 7.08189 8.1094 7.35161V13.2577C8.1094 13.5274 7.89075 13.746 7.62103 13.746C7.35131 13.746 7.13266 13.5274 7.13266 13.2577V7.35161C7.13266 7.08189 7.35131 6.86324 7.62103 6.86324Z"
                fill={props.fill ?? "white"}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.20682 0.374404L9.20802 0.375077L12.6827 2.30114C13.171 2.57159 13.5866 3.02619 13.8786 3.52137C14.1706 4.01657 14.3671 4.59978 14.3671 5.15721V7.54048C14.3671 7.8102 14.1484 8.02885 13.8787 8.02885C13.609 8.02885 13.3903 7.8102 13.3903 7.54048V5.15721C13.3903 4.81603 13.2645 4.40297 13.0372 4.01748C12.8099 3.63203 12.5091 3.32147 12.2096 3.15563L8.72986 1.22679C8.44966 1.06948 8.04898 0.976743 7.62103 0.976743C7.19308 0.976743 6.7924 1.06947 6.5122 1.22678L6.50989 1.22807L3.03268 3.15552C2.73318 3.32137 2.43214 3.63203 2.20486 4.01748C1.97756 4.40297 1.85174 4.81603 1.85174 5.15721V8.84281C1.85174 9.18398 1.97756 9.59705 2.20486 9.98253C2.43214 10.368 2.73298 10.6785 3.03249 10.8444L6.5122 12.7732C6.7924 12.9305 7.19307 13.0233 7.62103 13.0233C8.04899 13.0233 8.44967 12.9305 8.72987 12.7732C8.96506 12.6412 9.26276 12.7248 9.39479 12.96C9.52683 13.1952 9.44321 13.4929 9.20802 13.6249C8.74589 13.8844 8.16981 14 7.62103 14C7.07271 14 6.49715 13.8846 6.03522 13.6256L6.03405 13.6249L2.55934 11.6989C2.07103 11.4284 1.65548 10.9738 1.36349 10.4786C1.0715 9.98344 0.875 9.40024 0.875 8.84281V5.15721C0.875 4.59978 1.0715 4.01657 1.36349 3.52137C1.65548 3.02619 2.07083 2.57169 2.55915 2.30124L6.03524 0.374404C6.49716 0.115443 7.07271 0 7.62103 0C8.16935 0 8.7449 0.115443 9.20682 0.374404Z"
                fill={props.fill ?? "white"}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3094 9.44185C11.4283 9.44185 10.7141 10.1561 10.7141 11.0372C10.7141 11.9183 11.4283 12.6326 12.3094 12.6326C13.1905 12.6326 13.9047 11.9183 13.9047 11.0372C13.9047 10.1561 13.1905 9.44185 12.3094 9.44185ZM9.73731 11.0372C9.73731 9.61668 10.8889 8.46511 12.3094 8.46511C13.7299 8.46511 14.8815 9.61669 14.8815 11.0372C14.8815 12.4577 13.7299 13.6093 12.3094 13.6093C10.8889 13.6093 9.73731 12.4577 9.73731 11.0372Z"
                fill={props.fill ?? "white"}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.7873 12.5151C13.978 12.3244 14.2873 12.3244 14.478 12.5151L15.1291 13.1663C15.3199 13.357 15.3199 13.6662 15.1291 13.8569C14.9384 14.0477 14.6292 14.0477 14.4385 13.8569L13.7873 13.2058C13.5966 13.0151 13.5966 12.7058 13.7873 12.5151Z"
                fill={props.fill ?? "white"}
            />
        </svg>
    );
}
