export declare type GetEmployeeService = {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
};
export declare type CreateEmployee = {
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: number;
    isActive: boolean;
};
export declare type UpdateEmployee = {
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: number;
    isActive: boolean;
};
