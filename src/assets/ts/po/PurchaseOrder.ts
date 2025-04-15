import $ from "jquery";

export enum PurchaseOrderStatus
{
    CREATED,
    DELIVERED,
    PACKAGED,
    SHIPPED,
    SHELVED,
    COMPLETED,
    CANCELLED,
    ERROR,
}


export type PurchaseOrderInventory = {
    headers: string[],
    data: [name: string],
    limit: number,
    offset: number,
    total: number,
}

export class PurchaseOrder
{
    public readonly id: string;
    public readonly creation_date: Date;
    public readonly status: PurchaseOrderStatus | string;
    public readonly inventory: PurchaseOrderInventory;


    private constructor(id: string, creation_date: Date, status: PurchaseOrderStatus | string, inventory: PurchaseOrderInventory)
    {
        this.id = id;
        this.creation_date = creation_date;
        this.status = status;
        this.inventory = inventory;
    }

    static async get(id: string): Promise<PurchaseOrder>
    {
        const response = await $.get(`/api/po/${id}`);
        return this.fromObject(response);
    }


    static fromJSON(json: any): PurchaseOrder | null
    {
        try
        {
            return new PurchaseOrder(
                json.id,
                json.creation_date,
                json.status,
                json.inventory
            );
        } catch (e)
        {
            console.error("Failed to parse PurchaseOrder JSON:", json, e);
        }

        return null;
    }

    static fromObject(obj: any): PurchaseOrder
    {
        try
        {
            return new PurchaseOrder(
                obj.id,
                obj.creation_date,
                obj.status,
                obj.inventory
            );
        } catch (e)
        {
            console.error("Failed to parse PurchaseOrder:", obj, e);
        }
    }


}