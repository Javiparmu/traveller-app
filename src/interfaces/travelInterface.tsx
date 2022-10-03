import { User } from "./userInterface";

export interface Travel {
    title: string;
    startDate: Date;
    endDate: Date;
    destination: string;
    image: string | undefined;
    participants: User[];
}