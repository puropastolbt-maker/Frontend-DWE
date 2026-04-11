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
 
export const customersApi = { 
    list: () => http<Customer[]>("/api/customers"), 
    create: (dto: CreateCustomerDto) => 
        http<Customer>("/api/customers", { method: "POST", body: JSON.stringify(dto) }), 
    update: (id: number, dto: UpdateCustomerDto) => 
        http<Customer>(`/api/customers/${id}`, { method: "PATCH", body: JSON.stringify(dto) 
}), 
    remove: (id: number) => http<void>(`/api/customers/${id}`, { method: "DELETE" }), 
};