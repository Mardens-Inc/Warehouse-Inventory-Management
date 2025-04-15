import {Slider} from "@heroui/react";

export default function PurchasePriceFilter()
{
    return (
        <div className={"p-4 bg-background-L-100 rounded-lg w-full"}>
            <Slider
                label={"Price Range"}
                minValue={0}
                maxValue={1_000_000}
                step={1000}
                defaultValue={[0, 500_000]}
                formatOptions={{style: "currency", currency: "USD"}}
            />
        </div>
    );
}