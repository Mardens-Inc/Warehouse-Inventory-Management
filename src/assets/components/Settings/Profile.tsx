import {Card, CardBody, CardHeader} from "@heroui/react";

export default function Profile()
{
    return (
        <div className={"flex flex-col gap-4"}>
            <Card>
                <CardHeader><h5 id="profile">Profile Settings</h5></CardHeader>
                <CardBody>
                </CardBody>
            </Card>
        </div>
    );
}