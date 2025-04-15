import {Autocomplete, AutocompleteItem, Link} from "@heroui/react";

export default function PasswordResetInterval()
{
    return (
        <>
            <Autocomplete
                label={"Required Password Reset Interval"}
                placeholder={"Please select the required password reset interval."}

                description={<p>The interval at which a user must reset their password. Its no longer recommended to force password resets. For more information please see <Link className={"text-tiny"} href={"https://www.ncsc.gov.uk/blog-post/problems-forcing-regular-password-expiry"} target={"_blank"}> NCSC Guide</Link>.</p>}
            >
                <AutocompleteItem key={"30d"} textValue={"30d"} description={"This will trigger 30 days from when it was last reset"}>Every 30 Days</AutocompleteItem>
                <AutocompleteItem key={"1m"} textValue={"1m"} description={"This will trigger on the first of every month"}>Every Month</AutocompleteItem>
                <AutocompleteItem key={"6m"} textValue={"6m"} description={"This will trigger 6 months from when it was last reset"}>Every 6 Months</AutocompleteItem>
                <AutocompleteItem key={"12m"} textValue={"12m"} description={"This will trigger 12 months from when it was last reset"}>Every 12 Months</AutocompleteItem>
                <AutocompleteItem key={"1y"} textValue={"1y"} description={"This will trigger Jan 1st every year."}>Every Year</AutocompleteItem>
                <AutocompleteItem key={"never"} textValue={"never"} description={"This will never trigger a password reset"}>Never</AutocompleteItem>
            </Autocomplete>
        </>
    );
}