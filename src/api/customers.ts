import { http } from "./http"; 
 
export type Customer = { 
    id: number; 
    fullName: string; 
    email: string; 
    phone?: string | null; 
    createdAt?: string; 
}; 
 
export type CreateCustomerDto = { 
    fullName: string; 
    email: string; 
    phone?: string; 
}; 
 
export type UpdateCustomerDto = Partial<CreateCustomerDto>; 

type BackendCustomer = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    createdAt?: string;
};

type BackendCustomerPayload = {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
};

function splitFullName(fullName: string): { firstName: string; lastName: string } {
    const trimmed = fullName.trim();
    if (!trimmed) {
        return { firstName: "", lastName: "" };
    }

    const parts = trimmed.split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ") || firstName;
    return { firstName, lastName };
}

function toBackendPayload(dto: CreateCustomerDto | UpdateCustomerDto): BackendCustomerPayload {
    const { firstName, lastName } = splitFullName(dto.fullName ?? "");
    return {
        firstName,
        lastName,
        email: dto.email ?? "",
        ...(dto.phone ? { phone: dto.phone } : {}),
    };
}

function toCustomer(response: BackendCustomer): Customer {
    return {
        id: response.id,
        fullName: `${response.firstName} ${response.lastName}`.trim(),
        email: response.email,
        phone: response.phone,
        createdAt: response.createdAt,
    };
}
 
export const customersApi = { 
    list: async () => {
        const data = await http<BackendCustomer[]>("/api/customers");
        return data.map(toCustomer);
    }, 
    create: (dto: CreateCustomerDto) => 
        http<BackendCustomer>("/api/customers", { method: "POST", body: JSON.stringify(toBackendPayload(dto)) }).then(toCustomer), 
    update: (id: number, dto: UpdateCustomerDto) => 
        http<BackendCustomer>(`/api/customers/${id}`, { method: "PUT", body: JSON.stringify(toBackendPayload(dto)) 
}).then(toCustomer), 
    remove: (id: number) => http<void>(`/api/customers/${id}`, { method: "DELETE" }), 
};