import {cn, Switch, SwitchProps} from "@heroui/react";

interface ExtendedSwitchProps extends SwitchProps
{
    label: string;
    description: string;
}

export default function ExtendedSwitch(props: ExtendedSwitchProps)
{
    const {label, description, ...rest} = props;
    return (
        <Switch
            {...rest}
            defaultSelected={props.isSelected ?? false}
            onValueChange={props.onValueChange}
            classNames={{
                ...props.classNames,
                base: cn(
                    "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-background-L000 items-center",
                    "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary",
                    props.classNames?.base
                ),
                wrapper: cn("p-0 h-4 overflow-visible", props.classNames?.wrapper),
                thumb: cn("w-6 h-6 border-2 shadow-lg",
                    "group-data-[hover=true]:border-primary",
                    //selected
                    "group-data-[selected=true]:ml-6",
                    // pressed
                    "group-data-[pressed=true]:w-7",
                    "group-data-[selected]:group-data-[pressed]:ml-4",
                    props.classNames?.thumb
                )
            }}
        >
            <div className="flex flex-col gap-1">
                <p className="text-medium">{props.label}</p>
                <p className="text-tiny text-default-400">
                    {props.description}
                </p>
            </div>
        </Switch>
    );
}