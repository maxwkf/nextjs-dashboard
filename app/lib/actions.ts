"use server"

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {

    // alternative
    // const rawFormData = Object.fromEntries(formData.entries())
    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    }

    const { customerId, amount, status } = CreateInvoice.parse(rawFormData);
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // console.log(rawFormData)
    // console.log(typeof rawFormData.amount)

    await sql`
        insert into invoices (customer_id, amount, status, date)
        values (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    
    // Next.js has a Client-side Router Cache 
    //  that stores the route segments in the user's browser for a time.
    //  Along with prefetching, this cache ensures that users can quickly
    //  navigate between routes while reducing the number of requests
    //  made to the server.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    //Calling revalidatePath will trigger a new server request and re-render the table.
    revalidatePath('/dashboard/invoices');
}